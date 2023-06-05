"use client";

import Image from "next/image";
import React, { useState } from "react";
import { StepDefinition, Stepper, ImagePicker, BrushSelector } from "./stepper";

export default function DotGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>();
  const [brushUrl, setBrushUrl] = useState<string>();
  const [temp, setTemp] = useState<string>();

  const steps: Array<StepDefinition> = [
    { title: "first", contents: <ImagePicker handleFileSelect={setTemplateImage} /> },
    {
      title: "second",
      contents: <BrushSelector handleSelectBrush={(brush) => setBrushUrl(brush)} />,
    },
  ];

  const handleConvertImage = async () => {
    const response = await fetch(
      // Using the url directly is pretty smelly. This should be behind an API gateway, and authn/z
      "https://f2jtztzwxwb7eo47e2wonwmy3e0urewx.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        body: JSON.stringify({
          template: templateImage?.split(",")[1],
          brush: "http://dots-site.s3-website-us-east-1.amazonaws.com" + brushUrl,
        }),
      }
    );
    const lambdaResponse = await response.json();
    setTemp(
      "data:image/png;base64," + lambdaResponse.img.substring(2, lambdaResponse.img.length - 1)
    );
  };

  return (
    <main className="flex min-h-screen flex-row items-center justify-items-center p-24">
      <div className="basis-1/3">
        <Stepper steps={steps} direction="horizontal" initialIndex={0} />
        <div className="flex grid grow m-4 justify-items-center">
          <button className="" onClick={handleConvertImage}>
            CONVERT
          </button>
        </div>
      </div>
      <div className="basis-2/3">
        <div className="flex justify-center">
          {temp ? (
            <img src={temp} width={500} height={500} />
          ) : templateImage ? (
            <img src={templateImage} width={500} height={500} />
          ) : (
            <Image alt={"devon looking cool"} src="/hank.jpg" width={500} height={500} />
          )}
        </div>
      </div>
    </main>
  );
}
