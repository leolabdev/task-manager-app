import React from 'react';
import { Previews, ComponentPreview } from '@react-buddy/ide-toolbox';
import PaletteTree from './palette';
import App from "@/app/App";
// import App from "../app/App";
import {Button} from "@/shared/ui/Button/Button";

export const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
        <ComponentPreview path="/Button">
            <Button/>
        </ComponentPreview>
    </Previews>
  );
};
