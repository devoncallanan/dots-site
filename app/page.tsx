"use client";

import React, { useState } from "react";
import { ConfigForm } from "./configform";
import { DotCanvas } from "./dotcanvas";

export default function DotGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const [brushUrl, setBrushUrl] = useState<string | null>(null);

  return (
    <main >
      <div className="absolute left-0 right-0 text-center m-2 text-3xl">
          Dot Art!!
      </div>
      <div className="p-10 lg:p-48 h-screen flex">
        <div className=' grow rounded-md border-solid border-4 \
        grid lg:flex row-auto items-center h-full'>
          <div className="basis-1/3 h-full bg-slate-50">
            <ConfigForm onSetBrush={setBrushUrl} onSetTemplate={setTemplateImage}/>
          </div>
          <div className="basis-2/3 h-full">
            <DotCanvas
              templateImage={templateImage}
              brushUrl={brushUrl}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
