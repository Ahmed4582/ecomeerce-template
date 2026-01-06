import React from "react";

const MapSection = () => {
  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="w-full h-96 sm:h-[500px] lg:h-[600px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.123456789!2d8.5417!3d47.3769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDIyJzM2LjgiTiA4wrAzMiczMC4xIkU!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Contact Map"
        />
      </div>
    </div>
  );
};

export default MapSection;
