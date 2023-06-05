"use client";

import Image from "next/image";
import React, { useState } from "react";
import { StepDefinition, Stepper, ImagePicker, BrushSelector } from "./stepper";

export default function DotGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>();
  const steps: Array<StepDefinition> = [
    { title: "first", contents: <ImagePicker handleFileSelect={setTemplateImage} /> },
    {
      title: "second",
      contents: <BrushSelector handleSelectBrush={(brush) => console.log(brush)} />,
    },
    { title: "first", contents: <div>some string</div> },
    { title: "first", contents: <div>some string</div> },
  ];

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <Stepper steps={steps} direction="horizontal" initialIndex={0} />
      <div className="basis-2/3">
        <div className="flex justify-center">
          {templateImage ? (
            <img src={templateImage} width={500} height={500} />
          ) : (
            <Image alt={"devon looking cool"} src="/hank.jpg" width={500} height={500} />
          )}
        </div>
      </div>
    </main>
  );
}
