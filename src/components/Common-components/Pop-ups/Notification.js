import { useRef, useEffect } from 'react';
import React from 'react';
import { CgCloseO } from "react-icons/cg";
import { TbCircleCheck } from "react-icons/tb";
import { IoClose } from "react-icons/io5";


const Notification = ({ isOpen, onClose, buttonRef }) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    if (isOpen && notificationRef.current && buttonRef.current) {
      const viewportWidth = window.innerWidth;
      const notificationHeight = notificationRef.current.offsetHeight;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (viewportWidth < 640) { 
        notificationRef.current.style.left = '50%';
        notificationRef.current.style.right = 'auto';
        notificationRef.current.style.transform = 'translateX(-50%)';
        notificationRef.current.style.width = 'calc(100% - 2rem)'; 
        
        notificationRef.current.style.top = `${buttonRect.bottom + 10}px`;
        notificationRef.current.style.bottom = 'auto';
      } else {
        const wouldOverflow = buttonRect.bottom + notificationHeight > viewportHeight;
        
        if (wouldOverflow) {
          notificationRef.current.style.top = 'auto';
          notificationRef.current.style.bottom = `calc(100% - ${buttonRect.top}px + 10px)`;
        } else {
          notificationRef.current.style.top = `${buttonRect.bottom + 10}px`;
          notificationRef.current.style.bottom = 'auto';
        }
        
        notificationRef.current.style.transform = 'none';
        const rightEdge = buttonRect.right;
        notificationRef.current.style.right = `${document.documentElement.clientWidth - rightEdge}px`;
        notificationRef.current.style.left = 'auto';
        notificationRef.current.style.width = 'auto';
      }
    }
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen && notificationRef.current && buttonRef.current) {
        const viewportWidth = window.innerWidth;
        const notificationHeight = notificationRef.current.offsetHeight;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (viewportWidth < 640) {
          notificationRef.current.style.left = '50%';
          notificationRef.current.style.right = 'auto';
          notificationRef.current.style.transform = 'translateX(-50%)';
          notificationRef.current.style.width = 'calc(100% - 2rem)';
          
          notificationRef.current.style.top = `${buttonRect.bottom + 10}px`;
          notificationRef.current.style.bottom = 'auto';
        } else {
          const wouldOverflow = buttonRect.bottom + notificationHeight > viewportHeight;
          
          if (wouldOverflow) {
            notificationRef.current.style.top = 'auto';
            notificationRef.current.style.bottom = `calc(100% - ${buttonRect.top}px + 10px)`;
          } else {
            notificationRef.current.style.top = `${buttonRect.bottom + 10}px`;
            notificationRef.current.style.bottom = 'auto';
          }
          
          notificationRef.current.style.transform = 'none';
          const rightEdge = buttonRect.right;
          notificationRef.current.style.right = `${document.documentElement.clientWidth - rightEdge}px`;
          notificationRef.current.style.left = 'auto';
          notificationRef.current.style.width = 'auto';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  if (!isOpen) return null;

  const Para = [
    {
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },
    {
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },{
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },{
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },{
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },{
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },
    {
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },{
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },
    {
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    },{
      title : "Toast title",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing."
    }
    
    
  ]

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      <div 
        ref={notificationRef}
        className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50  max-w-[90%] md:max-w-[50%] lg:max-w-[30%] 3xl:max-w-[40%]"
        style={{ 
          maxHeight: '80%', 
          overflowY: 'auto',
          scrollbarWidth: 'none',  
          msOverflowStyle: 'none',  
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="p-3 sm:p-4 3xl:p-4 flex justify-between items-center border-b-2 border-gray-400 rounded-lg sticky top-0 z-10 bg-white">
          <h3 className="text-base sm:text-lg md:text-xl 2xl:text-2xl font-bold">Notification</h3>
          <button onClick={onClose} className="flex items-center justify-center w-6 h-6 rounded border-2 border-gray-900">
            <IoClose  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 3xl:w-8 3xl:h-8" 
         />
          </button>
        </div> 
         
        <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {Para.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-3 sm:p-4 rounded-lg shadow-sm gap-2 sm:gap-3 lg:gap-4 bg-[#FFFFFF]"
            >
              <TbCircleCheck
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6  3xl:w-8 3xl:h-8 mt-1" 
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm  md:text-lg  2xl:text-xl">{item.title}</h3>
                <p className="text-xs sm:text-sm   3xl:text-lg text-gray-600 mt-1 sm:mt-2">
                   {item.description}
                </p>
              </div>
              <button>
                <CgCloseO
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 3xl:w-8 3xl:h-8 mt-1" 
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notification;