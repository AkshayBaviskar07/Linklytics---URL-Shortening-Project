import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md'
import { IoCopy } from 'react-icons/io5'
import { LiaCheckSolid } from 'react-icons/lia'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import api from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi'
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph.jsx';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = React.useState(false);
  const [analyticToggle, setAnalyticToggle] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [analyticsData, setAnalyticsData] = React.useState([]);

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
    /^(https?:\/\/)?(www\.)?/,
    ''
  )

  const analyticHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  }

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=${dayjs(createdDate).format('YYYY-MM-DDTHH:mm:ss')}&endDate=${dayjs().format('YYYY-MM-DDTHH:mm:ss')}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setAnalyticsData(data);
      setSelectedUrl("");
      console.log("Fetched analytics data:", data);
    } catch (error) {
      console.error("Error fetching short URL analytics:", error);
      navigate('/error');
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  return (
    <div>
      <div className='p-4 border rounded-md shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-200'>
        {/* left part */}
        <div>
          {/* top */}
          <div>
            <a href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
              target="_blank"
              className="text-[17px] font-montserrat font-semibold text-linkColor hover:underline">
              {`${subDomain}/${shortUrl}`}
              <FaExternalLinkAlt className='inline-block ml-1 text-sm' />
            </a>
            <p className='font-normal text-[17px] text-slate-700 pt-1 '>{originalUrl}
            </p>
          </div>
          {/* bottom */}
          <div className='flex flex-row'>
            <div className='flex items-center text-green-500 mr-6 pt-2'>
              <MdOutlineAdsClick className='inline-block mr-1 text-lg ' />
              <span className='text-sm '>
                {clickCount}
                <span className='pl-1'>
                  {clickCount === 0 || clickCount === 1 ? 'click' : 'clicks'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* right part */}
        <div>
          <div className="flex  flex-1  sm:justify-end items-center gap-4
          mt-3">
            <CopyToClipboard
              onCopy={() => setIsCopied(true)}
              text={`${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}`}
            >
              <div className="flex cursor-pointer gap-1 items-center bg-btnColor py-2  font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white ">
                <button className="">{isCopied ? "Copied" : "Copy"}</button>
                {isCopied ? (
                  <LiaCheckSolid className="text-md" />
                ) : (
                  <IoCopy className="text-md" />
                )}
              </div>
            </CopyToClipboard>

            <div
              onClick={() => analyticHandler(shortUrl)}
              className='flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white'
            >
              <button>Analytics</button>
              <MdAnalytics className='text-md' />
            </div>
          </div>
        </div>
      </div>

      <React.Fragment>
        <div className={`${analyticToggle ? 'flex' : 'hidden'
          } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-full overflow-hidden`}>
          {loader ? (
            <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
              <div className="flex flex-col items-center gap-1">
                <Hourglass
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={['#306cce', '#72a1ed']}
                />
                <p className='text-slate-700'>Please Wait...</p>
              </div>
            </div>
          ) : (
            <>
              {analyticsData.length === 0 && (
                <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                  <h1 className=" text-slate-800 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                    No Data For This Time Period
                  </h1>
                  <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                    Share your short link to view where your engagements are
                    coming from
                  </h3>
                </div>
              )}

              <Graph graphData={analyticsData}/>
            </>
          )
          }
        </div>
      </React.Fragment>
    </div>
  )
}

export default ShortenItem;
