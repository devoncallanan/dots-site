import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DotCanvasProps {
  templateImage: string | null;
  brushUrl: string | null;
  configComplete: boolean;
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
    <div className="flex grid relative justify-center">
      <div className="sm:absolute z-10 row-auto items-center self-center justify-self-center m-4">
        {props.configComplete &&
          !converted &&
          (loading ? (
            <Image alt="loading" src="/Loading_icon.gif" width={50} height={50} />
          ) : (
            <button
              className={
                "rounded-full border-solid border-4 \
         bg-white hover:border-grey-700 text-black \
         font-bold py-2 px-4"
              }
              onClick={() => {
                handleConvertImage();
                setLoading(true);
              }}
            >
              CONVERT
            </button>
          ))}
      </div>
      <div className="row-auto">
        {dotsImage ? (
          <img src={dotsImage} key={dotsImage} width={500} height={500} />
        ) : props.templateImage ? (
          <img
            className={loading ? "opacity-50" : ""}
            src={props.templateImage}
            key={props.templateImage}
            width={500}
            height={500}
          />
        ) : (
          <Image alt={"devon looking cool"} src="/blank.jpg" width={500} height={500} />
        )}
      </div>
    </div>
  );
}
