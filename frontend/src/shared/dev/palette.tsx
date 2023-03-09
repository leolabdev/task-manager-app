import {
  Category,
  Component,
  Variant,
  Palette,
} from '@react-buddy/ide-toolbox';
import { Modal } from '@/shared/ui/Modal/Modal';
import {Loader} from "@/shared/ui/Loader";
import {Button} from "@/shared/ui/Button/Button";
import {Input} from "@/shared/ui/Input/Input";
import {Select} from "@/shared/ui/Select/Select";
import {Text} from "@/shared/ui/Text/Text";

export default () => (
  <Palette>
    <Category name="Text">
      <Component name="Hello message">
        <Variant>
          <span> Hello, Create React Buddy App! </span>
        </Variant>
      </Component>
    </Category>
    <Category name="shared">
      <Component name="Modal">
        <Variant>
          <Modal/>
        </Variant>
      </Component>
      <Component name="Loader">
        <Variant>
          <Loader/>
        </Variant>
      </Component>
      <Component name="Button">
        <Variant>
          <Button/>
        </Variant>
      </Component>
      <Component name="Text">
        <Variant>
          <Text/>
        </Variant>
      </Component>
      <Component name="Input">
        <Variant>
          <Input/>
        </Variant>
      </Component>
      <Component name="Select">
        <Variant>
          <Select options={[]}/>
        </Variant>
      </Component>
    </Category>
  </Palette>
);
