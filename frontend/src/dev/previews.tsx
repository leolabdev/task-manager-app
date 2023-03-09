import React from 'react';
import { Previews, ComponentPreview } from '@react-buddy/ide-toolbox';
import PaletteTree from './palette';
import App from "@/app/App";
// import App from "../app/App";
import {Button} from "@/shared/ui/Button/Button";
import MainPage from "@/pages/MainPage/ui/MainPage";
import {Text} from "@/shared/ui/Text/Text";

export const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
        <ComponentPreview path="/Button">
            <Button/>
        </ComponentPreview>
        <ComponentPreview path="/MainPage">
            <MainPage/>
        </ComponentPreview>
        <ComponentPreview path="/Text">
            <Text/>
        </ComponentPreview>
    </Previews>
  );
};