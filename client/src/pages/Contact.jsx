import { useForm } from 'react-hook-form';
import {
  IoAlertCircle,
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
  IoSendSharp,
} from 'react-icons/io5';
import { useSendContactMessage } from '../hooks/contactUseMutation';

const Contact = () => {
  const { mutate, isPending } = useSendContactMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  // Error Message Component for reusability
  const ErrorMessage = ({ message }) => (
    <p className="flex items-center gap-1.5 text-red-500 text-xs font-bold mt-2 ml-1 animate-pulse">
      <IoAlertCircle size={14} />
      {message}
    </p>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Get in <span className="text-sky-600">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start gap-5 group hover:border-sky-500 transition-all">
              <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <IoMailOutline size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Us</h3>
                <p className="text-gray-500 text-sm mt-1">
                  binsifat.official@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start gap-5 group hover:border-indigo-500 transition-all">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <IoCallOutline size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Call Us</h3>
                <p className="text-gray-500 text-sm mt-1">+880 17 7862 5668</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start gap-5 group hover:border-emerald-500 transition-all">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <IoLocationOutline size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Office</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Chittagong, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 ml-1 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register('name', {
                      required: 'Please enter your full name',
                    })}
                    placeholder="John Doe"
                    className={`w-full bg-gray-50 border-none ring-1 p-4 rounded-2xl focus:ring-2 outline-none transition-all placeholder:text-gray-400 ${
                      errors.name
                        ? 'ring-red-400 focus:ring-red-500'
                        : 'ring-gray-200 focus:ring-sky-500'
                    }`}
                  />
                  {errors.name && (
                    <ErrorMessage message={errors.name.message} />
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-sm font-bold text-gray-700 ml-1 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    placeholder="example@mail.com"
                    className={`w-full bg-gray-50 border-none ring-1 p-4 rounded-2xl focus:ring-2 outline-none transition-all placeholder:text-gray-400 ${
                      errors.email
                        ? 'ring-red-400 focus:ring-red-500'
                        : 'ring-gray-200 focus:ring-sky-500'
                    }`}
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email.message} />
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 ml-1 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  {...register('subject', {
                    required: 'Subject cannot be empty',
                  })}
                  placeholder="How can we help you?"
                  className={`w-full bg-gray-50 border-none ring-1 p-4 rounded-2xl focus:ring-2 outline-none transition-all placeholder:text-gray-400 ${
                    errors.subject
                      ? 'ring-red-400 focus:ring-red-500'
                      : 'ring-gray-200 focus:ring-sky-500'
                  }`}
                />
                {errors.subject && (
                  <ErrorMessage message={errors.subject.message} />
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 ml-1 mb-2">
                  Message
                </label>
                <textarea
                  rows="6"
                  {...register('message', {
                    required: 'Message content is required',
                  })}
                  placeholder="Tell us more about your inquiry..."
                  className={`w-full bg-gray-50 border-none ring-1 p-4 rounded-2xl focus:ring-2 outline-none transition-all resize-none placeholder:text-gray-400 ${
                    errors.message
                      ? 'ring-red-400 focus:ring-red-500'
                      : 'ring-gray-200 focus:ring-sky-500'
                  }`}
                />
                {errors.message && (
                  <ErrorMessage message={errors.message.message} />
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer md:w-max flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-12 py-4.5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-sky-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <IoSendSharp className="text-sky-400 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
