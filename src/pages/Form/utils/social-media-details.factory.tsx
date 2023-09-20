import React, { useState } from 'react';
import { FiInstagram,FiFacebook,FiLinkedin,} from 'react-icons/fi';
import { BsTiktok } from "react-icons/bs"
import { RiTwitterFill, RiTaskFill } from "react-icons/ri"

import { FormControl,  } from "@/shared/components"

function SocialMediaFields() {
  const [activeField, setActiveField] = useState('');

  const handleFieldFocus = (fieldName: React.SetStateAction<string>) => {
    setActiveField(fieldName);
  };

  const handleFieldBlur = () => {
    setActiveField('');
  };

  return (
    <div className="mb-10 w-full">
      <div className='md:flex justify-between'>

      {/* LinkedIn Field */}
      <div className={`input-field  relative ${activeField === 'LinkedIn' ? 'active' : ''} w-full mr-10 `}>
        <label htmlFor="LinkedIn" className="label ">
          LinkedIn
        </label>
        <div className='flex items-center mt-1'>
        <div className="icon mr-4 absolute right-0 top-12 ">
          <FiLinkedin color={activeField === 'LinkedIn' ? 'blue ' : 'black'} />
        </div>
        <FormControl
          fieldName="linkedIn"
          variant="input"
          id="LinkedIn"
          type="text"
          placeholder="Enter your LinkedIn"
          onFocus={() => handleFieldFocus('LinkedIn')}
          onBlur={handleFieldBlur}
        />
        </div>
     
      </div>

      {/* Facebook Field */}
      <div className={`input-field relative ${activeField === 'Facebook' ? 'active' : ''} w-full`}>
        <label htmlFor="Facebook" className="label ">
        Facebook
        </label>
        <div className='flex items-center'>

        <div className="icon mr-4 absolute right-0 top-12 ">
          <FiFacebook color={activeField === 'Facebook' ? 'blue' : 'black'} />
        </div>
        <FormControl
          fieldName="facebook"
          variant="input"
          id="Facebook"
          type="text"
          placeholder="Enter your Facebook"
          onFocus={() => handleFieldFocus('Facebook')}
          onBlur={handleFieldBlur}
        />
</div>
      </div>
      </div>
      <div className='md:flex justify-between'>

      {/* Instagram Field */}
      <div className={`input-field relative ${activeField === 'Instagram' ? 'active' : ''} w-full`}>
        <label htmlFor="Instagram" className="label ">
          Instagram / Thread
        </label>
        <div className='flex items-center'>

        <div className="icon mr-4 absolute right-0 top-12 ">
          <FiInstagram color={activeField === 'Instagram' ? 'blue' : 'black'} className='' />
        </div>
        <FormControl
          fieldName="instagram"
          variant="input"
          id="Instagram"
          type="text"
          placeholder="Enter your Instagram"
          onFocus={() => handleFieldFocus('Instagram')}
          onBlur={handleFieldBlur}
        />
</div>
      </div>

      {/* TikTok Field */}
      <div className={`input-field relative ${activeField === 'TikTok' ? 'active' : ''} w-full ml-10`}>
        <label htmlFor="TikTok" className="label ">
          TikTok
        </label>
        <div className='flex items-center'>

        <div className="icon mr-4 absolute right-0 top-12 ">
          <BsTiktok color={activeField === 'TikTok' ? 'blue' : 'black'} />
        </div>
        <FormControl
          fieldName="tiktok"
          variant="input"
          id="TikTok"
          type="text"
          placeholder="Enter your TikTok"
          onFocus={() => handleFieldFocus('TikTok')}
          onBlur={handleFieldBlur}
        />
</div>
      </div>
</div>
      <div className='md:flex justify-between'>
   {/* Twitter Field */}
      <div className={`input-field relative ${activeField === 'Twitter' ? 'active' : ''} w-full  `}>
        <label htmlFor="Twitter" className="label ">
          Twitter (X)
        </label>
        <div className='flex items-center'>

        <div className="icon mr-4 absolute right-0 top-12 ">
          <RiTwitterFill color={activeField === 'Twitter' ? 'blue' : 'black'} />
        </div>
        <FormControl
          fieldName="twitter"
          variant="input"
          id="Twitter"
          type="text"
          placeholder="Enter your Twitter"
          onFocus={() => handleFieldFocus('Twitter')}
          onBlur={handleFieldBlur}
        />
</div>
      </div>

      {/* Thread Field */}
      <div className={`input-field relative ${activeField === 'Thread' ? 'active' : ''} w-full ml-10`}>
        <label htmlFor="Thread" className="label ">
          SnapChat
        </label>
        <div className='flex items-center'>

        <div className="icon mr-4 absolute right-0 top-12 ">
          <RiTaskFill color={activeField === 'Thread' ? 'blue' : 'black'} />
        </div>
        <FormControl
          fieldName="thread"
          variant="input"
          id="Thread"
          type="text"
          placeholder="Enter your Thread"
          onFocus={() => handleFieldFocus('Thread')}
          onBlur={handleFieldBlur}
        />
</div>
      </div>
</div>
   
    </div>
  );
}

export default SocialMediaFields;
