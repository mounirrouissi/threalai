"use client";
import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";
import { AiOutlineToTop } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { promptInputState } from "@/states/promptInputState";
import { toast } from "react-hot-toast";
import { fetchImagesR2 } from "@/lib/worker";
import { useRouter } from "next/navigation";
import Feedback from '../components/footer/Feedback'

type ImageType = {
  name: string;
  url: string;
};

interface ImageItemProp {
  key: string;
  index: number;
  img: ImageType;
  handleUsePromptBtn: (prompt: string,imag:ImageType) => void;
}

function ImageItem({ index, img, handleUsePromptBtn }: ImageItemProp) {
  const initialPrompt = img.name.split("_").shift()?.toString().split(".").shift();
  const prompt = removeTextAfterLastComma(initialPrompt)
  // console.log("image url loaded  " + img.url)
  return (
    <div
      key={img.name + new Date()}
      className={`relative cursor-help 
  ${index === 0 && "md:col-span-2 md:row-span-2"}
  transition-transform duration-200 ease-in-out hover:-translate-y-2
  hover:scale-[103%]
  `}
    >
      <div className="absolute z-50 flex h-full w-full flex-col items-center justify-center rounded-xl bg-white opacity-0 transition-opacity duration-200 hover:opacity-80">
        <p className="p-5 text-center text-lg font-light">{prompt}</p>
        <button
          onClick={() => handleUsePromptBtn(prompt || "",img)}
          className="rounded-full bg-primary bg-opacity-100 px-4 py-2 text-sm text-white opacity-100 drop-shadow transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          Use Prompt
        </button>
      </div>
      <Image
        blurDataURL="/img/loading.svg"
        placeholder="blur"
        src={img.url}
        alt={img.name}
        width={800}
        height={800}
        className="-z-10 w-full rounded-xl shadow-2xl drop-shadow-lg"
        unoptimized={index > 1}
      />
    </div>
  );
}

function Images() {
  const [isOpenFeedbak, setOpenFeedback] = useState(false);
  const [scrollButton, setScrollButton] = useState(false);
  const setInput = useSetRecoilState(promptInputState);
  const router = useRouter();
  // Keep track of the scroll pos
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Function to handle the scroll event and set the visibility state
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setScrollButton(true);
    } else {
      setScrollButton(false);
    }
  };

  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  // console.log("images: retirieved from R2 using SWR ", images);

  const handleUsePromptBtn = (prompt: string, imageItem: ImageType) => {
    setInput(prompt);
    //  window.open(imageItem.url);
     console.log("Image before : " + JSON.stringify(imageItem.url))
      setInput(prompt);
   // toast.success("image used!" + prompt) ;
    // localStorage.setItem('imageUrl', `https://production.print.mounirrouissi2.workers.dev/${keyPart}`);
    
    // router.push(`/Playground`);
      // router.push(`/Home?imageUrl=${encodeURIComponent("https://production.print.mounirrouissi2.workers.dev/4hearts_1706871506571")}`);
    // // router.push(`/Home?imageUrl=${encodeURIComponent("https%3A%2F%2Freplicate.delivery%2Fpbxt%2FV8FxclEERIbEHV31V6M9sQz0qjIai9f7XpAKIGwgzYbuMqLJA%2Fout-0.png")}`);
    
  };

  function handleFeedback(): void {
    console.log("Feedback button clicked"+ isOpenFeedbak);
    setOpenFeedback(!isOpenFeedbak);
  }

  return (

    <div className="">
        <div className="flex flex-col items-center bg-primary-200  text-white p-5">
            <h1 className="text-2xl">Explore Ideas</h1>
            <hr className="w-1/2 border-pink-500 mt-2" />
        </div>
      <div className="p-8 lg:p-0">
        {/* Scroll to top button */}
        <button
          className={`fixed bottom-24 right-10 z-10 rounded-full bg-green-500 p-4 opacity-70 drop-shadow transition-all duration-500 hover:scale-110 hover:opacity-100 ${
            !scrollButton && `hidden cursor-default`
          }`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <AiOutlineToTop size="1.75em" color="white" />
        </button>
        {/* Refresh Images button */}
        <button
          onClick={() => setOpenFeedback(true)}
          className="fixed bottom-10 right-10 z-20 animate-fade rounded-md bg-purple-400/90 px-5 py-3 font-bold text-white animate-delay-[800ms] animate-duration-1000 animate-once animate-ease-in-out hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <span className="drop-shadow-sm">
            {!isLoading && isValidating ? "Refreshing..." : "Feedback"}
          </span>
        </button>
        {isLoading ? (
          <div className="flex animate-fade-up items-center justify-center pb-7 animate-delay-[600ms] animate-duration-1000 animate-ease-in-out">
            <p className="mt-48 animate-bounce rounded-lg bg-black bg-opacity-30 p-4 text-center text-xl font-light text-white drop-shadow-sm sm:mt-80 sm:px-8">
              Loading{" "}
              <span className="bg-gradient-to-r from-zinc-200 via-orange-400 to-red-300 bg-clip-text font-bold text-transparent">
                AI
              </span>{" "}
              images from the secret chamber of digital wonders...
            </p>
          </div>
        ) : (
          <div className="grid animate-fade-up grid-cols-1 gap-4 px-0 animate-delay-[600ms] animate-duration-1000 animate-ease-in-out md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {images?.map((img: ImageType, i: number) => (
              <ImageItem
                index={i}
                key={img.name}
                img={img}
                handleUsePromptBtn={handleUsePromptBtn}
              />
            ))}
          </div>
        )}
      
      </div>
    {isOpenFeedbak && <Feedback isOpenFeedbak={isOpenFeedbak} setOpenFeedback={ setOpenFeedback} /> }
    </div>
  );
}

export default Images;
function removeTextAfterLastComma(initialPrompt: string | undefined) {
  if (initialPrompt) {
    const lastCommaIndex = initialPrompt.lastIndexOf(',');
    return lastCommaIndex !== -1 ? initialPrompt.substring(0, lastCommaIndex) : initialPrompt;
  }
  return initialPrompt;
}


