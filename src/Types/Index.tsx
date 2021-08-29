
export type Item = {
    code: string;
    description: string;
    varieties: string[]
  }

export type Options = {    
    code: string;
    description: string;
  }

export type Variety = {
    code: string;
    description: string;
    options: Options[]
  }

export type SelectedItem = {
    code: string;
    description: string;
    varieties: Variety[]
  }

export type CodePart = {
    type: string;
    id?: string
  }

export  type Inputs = {
  amount: string
}

export type ItemMenuProps = {
  item: SelectedItem;
  onSubmit: (codeToSet : string) => void;
  onReturn: () => void;
  code: string;
  arr: CodePart[]
}

export type OptionFrameProps = {
  variety : Variety;
  updateCode : (a: string, b: string) => void
}

export type ItemBoxProps = {
  name: string;
  onClick?: () => void;
  type?: 'button' | 'submit'
}