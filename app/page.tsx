"use client";

import React, { useState } from "react";
import { DotCanvas } from "./dotcanvas";
import { StepDefinition, Stepper, ImagePicker, BrushSelector } from "./stepper";

export default function DotGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const [brushUrl, setBrushUrl] = useState<string | null>(null);

  const steps: Array<StepDefinition> = [
    { title: "first", contents: <ImagePicker handleFileSelect={setTemplateImage} /> },
    {
      title: "second",
      contents: <BrushSelector handleSelectBrush={(brush) => setBrushUrl(brush)} />,
    },
  ];


  return (
    <main className="flex min-h-screen flex-row items-center justify-items-center p-24">
      <div className="basis-1/3">
        <Stepper steps={steps} direction="horizontal" initialIndex={0} />
      </div>
      <div className="basis-2/3">
        <DotCanvas templateImage={templateImage} configComplete={false} brushUrl={brushUrl}/>
      </div>
    </main>
  );
}
