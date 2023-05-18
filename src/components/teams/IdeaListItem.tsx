import React, { FC } from "react";

interface IIdeaListItemProps {
  id: string;
  value: string;
  checkboxValue: string;
  emphasized?: boolean;
  onEnter?: (event: IIdeaListItemEnterEvent) => void;
  onClickConnector?: (event: IIdeaListItemClickConnectorEvent) => void;
  onChangeCheckbox?: (event: IIdeaListItemChangeCheckboxEvent) => void;
}

interface IIdeaListItemEnterEvent {
  id: string;
  value: string;
}

interface IIdeaListItemClickConnectorEvent {
  id: string;
}

interface IIdeaListItemChangeCheckboxEvent {
  id: string;
  value: boolean;
}

const IdeaListItem: FC<IIdeaListItemProps> = (/* props */) => {
  return <></>;
};

export default IdeaListItem;
