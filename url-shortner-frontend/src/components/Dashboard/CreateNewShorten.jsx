import {useState} from 'react'
import { useStoreContext } from '../../contextApi/ContextApi.jsx';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import Tooltip from '@mui/material/Tooltip';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api.js';
import toast from 'react-hot-toast';

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token }  = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: '',
    },
    mode: 'onTouched',
  });

  const createShortUrl = async (data) => {
    setLoading(true);
    try{
      const { data: responseData } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const shortenUrl = `${ import.meta.env.VITE_REACT_SUBDOMAIN}/${responseData.shortUrl}`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success('Short URL created and copied to clipboard!', {
          position: 'top-center',
          duration: 4000,
          className: "mb-5"
        });
      });
      reset();
      setOpen(false);
    } catch(error) {
      console.error('Error creating short URL:', error);
      toast.error('Failed to create short URL. Please try again.', {
        position: 'top-center',
        duration: 3000,
        className: "mb-5"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center bg-white rounded-md">
    <form
        onSubmit={handleSubmit(createShortUrl)}
        className="sm:w-[450px] w-[360px] relative  shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        <h1 className="font-montserrat sm:mt-0 mt-3 text-center  font-bold sm:text-2xl text-[22px] text-slate-800 ">
                Create New Shorten Url
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
          />
        </div>

        <button
          className="bg-customRed font-semibold text-white w-32  bg-custom-gradient  py-2  transition-colors  rounded-md my-3"
          type="text"
        >
          {loading ? "Loading..." : "Create"}
        </button>

        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className=" absolute right-2 top-2  "
            >
              <RxCross2 className="text-slate-800   text-3xl" />
            </button>
          </Tooltip>
        )}

      </form>
    </div>
  )
}
export default CreateNewShorten