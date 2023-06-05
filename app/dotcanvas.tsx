import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DotCanvasProps {
  templateImage: string | null;
  brushUrl: string | null;
  configComplete: boolean;
}

export function DotCanvas(props: DotCanvasProps) {
  const [dotsImage, setDotsImage] = useState<string | null>();

  useEffect(() => {
    setDotsImage(null);
  }, [props.templateImage]);

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
  };

  return (
    <div className="flex grid justify-center">
      <div className="row-auto">
        {dotsImage ? (
          <img src={dotsImage} key={dotsImage} width={500} height={500} />
        ) : props.templateImage ? (
          <img src={props.templateImage} key={props.templateImage} width={500} height={500} />
        ) : (
          <Image alt={"devon looking cool"} src="/blank.jpg" width={500} height={500} />
        )}

      </div>
      <div className="flex grid row-auto grow m-4 justify-items-center">
        <button className="" onClick={handleConvertImage}>
          CONVERT
        </button>
      </div>
    </div>
  );
}
