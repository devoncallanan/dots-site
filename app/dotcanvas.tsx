import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DotCanvasProps {
  templateImage: string | null;
  brushUrl: string | null;
}

export function DotCanvas(props: DotCanvasProps) {
  const [dotsImage, setDotsImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [converted, setConverted] = useState<boolean>(false);

  useEffect(() => {
    setDotsImage(null);
    setConverted(false);
  }, [props.templateImage, props.brushUrl]);

  const handleConvertImage = async () => {
    const response = await fetch(
      // Using the url directly is pretty smelly. This should be behind an API gateway, and authn/z
      "https://f2jtztzwxwb7eo47e2wonwmy3e0urewx.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        body: JSON.stringify({
          template: props.templateImage?.split(",")[1],
          brush: "http://dots-site.s3-website-us-east-1.amazonaws.com" + props.brushUrl,
        }),
      }
    );
    const lambdaResponse = await response.json();
    setDotsImage(
      "data:image/png;base64," + lambdaResponse.img.substring(2, lambdaResponse.img.length - 1)
    );
    setConverted(true);
    setLoading(false);
  };

  return (
    <div className="flex grid relative justify-center h-full p-4">
      <div className="sm:absolute z-10 row-auto self-center justify-self-center m-4">
        {!converted &&
          (loading ? (
            <Image alt="loading" src="/Loading_icon.gif" width={50} height={50} />
          ) : (
            <button
              className={
                "rounded-full border-solid border-4 \
         bg-white hover:border-grey-700 text-black \
         font-bold py-2 px-4"
              }
              disabled={!props.brushUrl || !props.templateImage}
              onClick={() => {
                handleConvertImage();
                setLoading(true);
              }}
            >
              CONVERT
            </button>
          ))}
      </div>
      <div className="row-auto h-full">
        <div className="max-w-lg h-full text-center">
          {dotsImage ? (
            <img 
              className="max-h-full "
              src={dotsImage} key={dotsImage}/>
          ) : props.templateImage ? (
            <img
              className={"max-h-full block m-auto" +
               (loading ? "opacity-50" : "")}
              src={props.templateImage}
              key={props.templateImage}
            />
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}
