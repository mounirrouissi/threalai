"use client";
import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState, useCallback, useEffect } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { promptInputState } from "@/states/promptInputState";
import { useRouter } from "next/navigation";
import { proxy } from 'valtio';
import { SingleValue, ActionMeta } from 'react-select';
import { useSnapshot } from 'valtio';
import state from '../store';
import useLocalStorage from './useLocalStorage'
import getImageKeyFromUrl from '../lib/utils'
// Declare this a client-side component
import Select from 'react-select';
import { OptionType } from "@/lib/types";

function Prompt() {
  const snap = useSnapshot(state);

  const [input, setInput] = useRecoilState(promptInputState);
  // const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageStyle, setImageStyle] = useState("");

  const GENERATE_COOLDOWN = 10;
  const router = useRouter();



  const {
    data: suggestion,
    isLoading,
    mutate: updateSuggestion,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;
  

  const [savedCounter, setSavedCounter] = useState<string | null>(null);
  const [savedDate, setSavedDate] = useState<string | null>(null);
  const [counter, setCounter] = useLocalStorage('counter', 5);

  // Initialize state with value from localStorage or set to some default value
// Initialize state with value from localStorage or set to some default value
/* const [counter, setCounter] = useState<number | null>(() => {
  // Try to get the counter value from localStorage
  let savedCounter: string | null = null; // Initialize with null
  if (typeof window !== "undefined")  
   savedCounter = window.localStorage.getItem('counter');
  // If there's a saved counter, parse it to an integer; otherwise, use   5 as the default
  return savedCounter ? parseInt(savedCounter) :   5;
}); */



useEffect(() => {
  const savedDate = window.localStorage.getItem('date');
  const savedCounter = window.localStorage.getItem('counter');
  const today = new Date().toISOString().split('T')[0]; // Get today's date without time


  // Check if the saved date is different from today's date
  if (savedDate !== today) {
    // Reset the counter to  10 and update the date in localStorage
    window.localStorage.setItem('date', today);
    window.localStorage.setItem('counter', '5');
    setCounter(5);
  } else {
    // Return the saved counter or  10 if there's no saved counter
    const counterValue = savedCounter ? parseInt(savedCounter,  10) :  5; // Corrected base to  10
    setCounter(counterValue);
  }
}, []);

// ... rest of your component

// Define your options for the dropdown menu
const options = [
  { value: '1', label: 'Default' },
  { value: '2', label: 'Anime' },
  { value: '3', label: 'Realistic' },
  { value: '4', label: 'Oil Painting' },
  { value: '5', label: 'Watercolor' },
  { value: '6', label: 'Sketch' },
  { value: '7', label: 'Pixel Art' },
  { value: '8', label: 'Impressionist' },
  { value: '9', label: 'Surrealism' },
  { value: '10', label: 'Cubism' },
  { value: '11', label: 'Fantasy' },
  { value: '12', label: 'Science Fiction' },
  { value: '13', label: 'Vaporwave' },
  { value: '14', label: 'Gothic' },
  { value: '15', label: 'Baroque' },
  { value: '16', label: 'Steampunk' },
  { value: '17', label: 'Cyberpunk' },
  { value: '18', label: 'Retro' },
  { value: '19', label: 'Minimalist' },
  { value: '20', label: 'Abstract' },
  // ... you can continue adding more styles as options
];

useEffect(() => {
  const date = window.localStorage.getItem('date');
  const savedCounter = window.localStorage.getItem('counter')
  setSavedCounter(savedCounter)
  setCounter(savedCounter? parseInt(savedCounter) : 5);
  setSavedDate(date);
}, []);
// Update localStorage whenever the counter changes
  useEffect(() => {
    console.log("counter =="+ counter)
    if (counter) {
      window.localStorage.setItem('counter', counter.toString());    }
  }, [counter]);


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  // console.log("Submit clicked!");
  e.preventDefault();
  if (!canGenerateImage()) {
    toast.error(
      `You can only generate an image every ${GENERATE_COOLDOWN} seconds.`,
    );
    return;
  }
  await submitPrompt();
   //after the image genzerated I should go to a new route address :http://localhost:3000/imagenamekey
};


  // Handler for when an option is selected
  const handleSelectChange = (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<string>) => {
    if (newValue) {
      setImageStyle(newValue.label);
      // You can also perform other actions here if needed
    }
  };
  const submitPrompt = async (useSuggestion?: boolean) => {
    setIsGenerating(true);
    const inputPrompt = input;
    setInput("");



    let prompt = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = prompt;
    const notificationPromptPromptShort = notificationPrompt.slice(0, 40);

    const notification = toast.loading(
      `We are creating: ${notificationPromptPromptShort}...`,
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );

    let prediction = null;
    // Parse the JSON string back into an object
    console.log('imageStyle while submitting:' + JSON.stringify(imageStyle))
    console.log('imageStyle while submitting:' + options.find(option => option.label === imageStyle))
    const imageStyleObject = JSON.parse(JSON.stringify(imageStyle));


    // Access the label property of the object
    const label = imageStyleObject ;
 
    console.log("imageStyleObject "+ label)
        prompt = `${prompt}  ${label ? ',' + label + ' style' : ''} , high resolution `;

    // Check if selectedColor is not empty
if (snap.selectedColor && snap.selectedType !== 'Frame') {
  prompt += `, ${snap.selectedColor} flat background`;
}
let size = "1024x1024";

if (snap.selectedType == 'Frame') {
 size = "1024x1792";
} else {
 size = "1024x1024";  
}
    
    console.log("prompt: ", prompt , "size = "+ size);
    // generate image
    try {
      const res = await fetch("/api/generateImage/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt,size : size }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      prediction = await res.json();
      console.log("response from upload:", prediction);
      const image = prediction.data[0].url;

      console.log("image after generating: " + image)
  
      // upload image to cloudflare
      const response = await fetch('/api/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image, prompt }),
  
      });

      
      
    // Fix indexing error
    const text = await response.text();
  
    const keyPart = text.split(' ')[1];

   // console.log("date from upload= " + keyPart);
   // console.log("date from upload 2 pass= " + `https://production.print.mounirrouissi2.workers.dev/${keyPart}`);


   // decrease counter
     // setCounter((prevCounter : number | null) => prevCounter !== null && prevCounter > 0 ? prevCounter - 1 : prevCounter); 
     if (counter !== null && counter >  0) {
       const newCounter = counter -  1;
       setCounter(newCounter);
       window.localStorage.setItem('counter', newCounter.toString());
       console.log('new counter ' + newCounter);
     }
     
          localStorage.setItem('imageUrl', `https://production.print.mounirrouissi2.workers.dev/${keyPart}`);
     console.log('new counter '+ counter)
     // state.logoDecal = `https://production.print.mounirrouissi2.workers.dev/${keyPart}`;
     setIsGenerating(false);
     router.push(`/Playground`);
   
    } catch (error) {
      console.error("Error during image generation:", error);
      toast.error("Unable to process the request.", {
        id: notification,
      });
    }

    
    

   


    // console.log("response froom upload: " + response)

    // if (!response.ok) {
    //   throw new Error('Failed to upload image');
    // }
    // if (
    //   !response.ok
    // ) {
    //   toast.error("Unable to process the request.", {
    //     id: notification,
    //   });
    // } else {
    //   toast.success("Your image has been generated!!!", {
    //     id: notification,
    //   });
    // }

      // updateImages();
      // updateLastGenerated();
    //
    // router.push(`/images/123?imageUrl=${image}`)
    // router.push(`/Home?imageUrl=${encodeURIComponent(image)}`);

  };


  const handlePlaceHolder = () => {
    if (loading) return "I'm thinking of a prompt for you...";
    if (suggestion) return suggestion;
    else return "Enter a prompt here.";
  };

  const suggestionBlockWhenHasInput = () => {
    if (counter === 0)
      return (  
        <p className="animate-flip-down pt-2 pl-2 font-bold text-white drop-shadow-md animate-normal animate-duration-500 animate-once animate-ease-in-out">
          ✨ Thank you for using AI Shop. Come back tomorrow for more 🪙
          <span className="select-all font-light font-bold"></span>
        </p>
      );
  };

  const canGenerateImage = () => {
    const lastGenerated = localStorage.getItem("lastGenerated");
    if (!lastGenerated) return true;

    const timeSinceLastGenerated = Date.now() - parseInt(lastGenerated, 10);
    return timeSinceLastGenerated >= GENERATE_COOLDOWN * 1000;
  };

  const updateLastGenerated = () => {
    localStorage.setItem("lastGenerated", Date.now().toString());
  };

 


 /*  const handleNewSuggestion = () => {
    try {
      updateSuggestion(); 
    } catch (error) {
      console.log("Update Suggestion Err", error);
    }
  }; */

/*   const handleUseSuggestion = async () => {
    // console.log("Use Suggestion clicked!");
    if (!canGenerateImage()) {
      toast.error(
        `You can only generate an image every ${GENERATE_COOLDOWN} seconds.`,
      );
      return;
    }
    await submitPrompt(true);
       
  }; */

  return (
    <div className="mx-8 mt-4 animate-fade-up animate-delay-[200ms] animate-duration-1000 animate-once animate-ease-in-out lg:mx-10 lg:mb-8 sticky top-0 z-10">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col space-y-2 rounded-md lg:flex-row lg:space-x-4 lg:space-y-0 lg:divide-x"
      >
        <textarea
          placeholder={handlePlaceHolder()}
          className="flex-1 rounded-lg p-4 shadowlg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
<Select
  options={options as any} // Use 'any' to bypass type checking
  className="z-50" // You can define custom styles or classes
  placeholder="Select a style"
  isSearchable={true}
  styles={{
    control: (baseStyles, state) => ({
      ...baseStyles,
      height: '72px', // Set the height you want here
      // borderColor: state.isFocused ? 'grey' : 'red',
      // You may also want to adjust padding or other properties to align with the new height
    }),
    // Add any other custom styles for other parts of the Select component if necessary
  }}
  onChange={handleSelectChange as any} // Set the handler here
  value={options.find(option => option.label === imageStyle)}
  // Allows users to search through the options
  // Define other props like onChange, value, isDisabled as needed
/>

        <button
          className={`rounded-xl border-none bg-gradient-to-r from-purple-500 to-purple-900 p-4 font-bold text-white opacity-100 drop-shadow transition-all ${
            !input || isGenerating || counter === 0 
              ? `cursor-not-allowed opacity-50 shadow-lg`
              : `animate-pulse hover:-translate-y-1 hover:scale-105 hover:animate-none`
          }`}
          type="submit"
          disabled={!input || isGenerating || counter == 0 }
        >
         ✨ Generate
        </button>
        <button
       className={`rounded-xl border-none p-4 font-bold text-white shadow-lg transition-all duration-150 hover:-translate-y-1 hover:scale-105 ${counter!! <= 3 ? 'bg-red-500' : 'bg-green-500'}`}
       type="button"
       // onClick={handleNewSuggestion}
     >
        <div className="flex items-center justify-center">
          <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 256 256" 
                
              >
                <g
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          strokeWidth={0}
          strokeMiterlimit={10}
          fill="none"
                >
          <circle cx={45.001} cy={47.211} r={42.791} fill="#e88102" />
          <circle cx={45} cy={42.79} r={35} fill="#f39e09" />
          <path
            d="M45 13.791c17.977 0 32.78 13.555 34.766 31 .15-1.313.234-2.647.234-4 0-19.33-15.67-35-35-35s-35 15.67-35 35c0 1.353.085 2.687.234 4 1.986-17.445 16.789-31 34.766-31z"
            fill="#e88102"
          />
          <path
            d="M45 0C21.367 0 2.209 19.158 2.209 42.791c0 23.633 19.158 42.791 42.791 42.791s42.791-19.158 42.791-42.791C87.791 19.158 68.633 0 45 0zm0 75.928c-18.301 0-33.137-14.836-33.137-33.137C11.863 24.49 26.699 9.653 45 9.653S78.137 24.49 78.137 42.791 63.301 75.928 45 75.928z"
            fill="#feec9a"
          />
          <path
            d="M45 0C21.367 0 2.209 19.158 2.209 42.791c0 23.633 19.158 42.791 42.791 42.791s42.791-19.158 42.791-42.791C87.791 19.158 68.633 0 45 0zm0 75.928c-18.301 0-33.137-14.836-33.137-33.137C11.863 24.49 26.699 9.653 45 9.653S78.137 24.49 78.137 42.791 63.301 75.928 45 75.928z"
            fill="#fdd835"
          />
          <path
            d="M83.422 23.947l-7.339 7.339a33.059 33.059 0 012.035 10.723l8.623-8.623a42.517 42.517 0 00-3.319-9.439zM44.218 75.909a33.032 33.032 0 01-10.723-2.035l-7.339 7.339a42.469 42.469 0 009.439 3.32l8.623-8.624zM15.236 57.365l-7.118 7.118a43.001 43.001 0 0012.685 13.598l6.975-6.975a33.281 33.281 0 01-12.542-13.741zM66.692 5.909l-7.118 7.118a33.286 33.286 0 0113.741 12.541l6.975-6.975A43.02 43.02 0 0066.692 5.909zM49.861 10.012c1.441.212 2.849.522 4.223.913l7.565-7.565a42.502 42.502 0 00-3.756-1.379l-8.032 8.031zM5.569 59.44l7.565-7.565a32.937 32.937 0 01-.913-4.223L4.19 55.683a42.406 42.406 0 001.379 3.757z"
            fill="#feec9a"
          />
          <path
            d="M44.737 67.688c-4.711 0-9.153-2.883-10.902-7.546a2.999 2.999 0 011.756-3.862 2.996 2.996 0 013.862 1.755c1.089 2.906 4.34 4.389 7.248 3.294a5.637 5.637 0 003.294-7.248 5.572 5.572 0 00-3.685-3.412l-.188-.062-4.224-1.547c-3.497-1.06-6.231-3.618-7.512-7.033a11.555 11.555 0 01.302-8.896 11.552 11.552 0 016.504-6.077c6.002-2.25 12.72.801 14.972 6.806a3 3 0 01-5.617 2.108 5.637 5.637 0 00-7.249-3.295 5.593 5.593 0 00-3.148 2.941 5.596 5.596 0 00-.146 4.307 5.573 5.573 0 003.685 3.413l.187.062 4.225 1.547c3.496 1.06 6.23 3.618 7.512 7.033 2.251 6.005-.803 12.722-6.806 14.973-1.34.5-2.716.739-4.07.739z"
            fill="#e88102"
          />
          <path
            d="M45 32.323a3 3 0 01-3-3V24.5a3 3 0 116 0v4.823a3 3 0 01-3 3zM45 72.5a3 3 0 01-3-3v-4.823a3 3 0 116 0V69.5a3 3 0 01-3 3z"
            fill="#e88102"
          />
          <path
            d="M44.737 63.688c-4.711 0-9.153-2.883-10.902-7.546a2.999 2.999 0 011.756-3.862 2.996 2.996 0 013.862 1.755c1.089 2.906 4.34 4.389 7.248 3.294a5.637 5.637 0 003.294-7.248 5.572 5.572 0 00-3.685-3.412l-.188-.062-4.224-1.547c-3.497-1.06-6.231-3.618-7.512-7.033a11.555 11.555 0 01.302-8.896 11.552 11.552 0 016.504-6.077c6.002-2.25 12.72.801 14.972 6.806a3 3 0 01-5.617 2.108 5.637 5.637 0 00-7.249-3.295 5.593 5.593 0 00-3.148 2.941 5.596 5.596 0 00-.146 4.307 5.573 5.573 0 003.685 3.413l.187.062 4.225 1.547c3.496 1.06 6.23 3.618 7.512 7.033 2.251 6.005-.803 12.722-6.806 14.973-1.34.5-2.716.739-4.07.739z"
            fill="#fdd835"
          />
          <path
            d="M45 28.323a3 3 0 01-3-3V20.5a3 3 0 116 0v4.823a3 3 0 01-3 3zM45 68.5a3 3 0 01-3-3v-4.823a3 3 0 116 0V65.5a3 3 0 01-3 3z"
            fill="#fdd835"
          />
                </g>
              </svg>
                 { counter}
        </div>
     </button> 

        {/* <button
          className="rounded-xl border-none bg-green-500 p-4 font-bold text-white shadow-lg transition-all duration-150 hover:-translate-y-1 hover:scale-105"
          type="button"
          onClick={handleNewSuggestion}
        >
          Gimme a new suggestion!
        </button> */}

        {/* <button
          className={`p-4 transition-transform ${
            isGenerating
              ? "bg-cyan-50 bg-transparent text-cyan-300"
              : "bg-cyan-100 text-cyan-800 hover:-translate-y-1 hover:scale-105"
          } rounded-xl border-none font-bold shadow-lg transition-colors duration-150`}
          type="button"
          onClick={() => handleUseSuggestion()}
          disabled={isGenerating}
        >
          Use Suggestion.
        </button> */}
      </form>
      {suggestionBlockWhenHasInput()}
    </div>
  );
}

export default Prompt;
