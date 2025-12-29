import dayjs from 'dayjs'
import React from 'react'
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { MdOutlineAdsClick } from 'react-icons/md'
import { IoCopy } from 'react-icons/io5'
import { LiaCheckSolid } from 'react-icons/lia'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
    /^(https?:\/\/)?(www\.)?/,
    ''
  )

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
          <div className="flex  flex-1  sm:justify-end items-center gap-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortenItem;

{/*
<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4'>
          <div className='mb-2 sm:mb-0'>
            <a href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
              target="_blank"
              className="text-[17px] font-montserrat font-semibold text-linkColor hover:underline">
              {`${subDomain}/${shortUrl}`}
              <FaExternalLinkAlt className='inline-block ml-1 text-sm' />
            </a>
            <p className='font-normal text-[17px] text-slate-700 pt-1 '>{originalUrl}
            </p>
          </div>
          <div className='flex flex-row sm:flex-row sm:items-center gap-4'>
            <div className='flex items-center text-green-500'>
              <MdOutlineAdsClick className='inline-block mr-1 text-lg ' />
              <span className='text-sm'>
                {clickCount}
                <span className='pl-1'>
                  {clickCount === 0 || clickCount === 1 ? 'click' : 'clicks'}
                </span>
              </span>
            </div>
            <div className='flex items-center text-slate-600'>
              <FaRegCalendarAlt className='inline-block mr-1 text-md ' />
              <span className='text-sm'>
                {dayjs(createdDate).format('MMM D, YYYY')}
              </span>
            </div>
          </div>
        </div>

*/}