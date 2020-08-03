import { PureComponent } from "react";
import ReactDOM from "react-dom";

export default class SectionContent extends PureComponent {
  constructor() {
    super();

    this.el = document.createElement("div");
  }

  componentDidMount() {
    const { name } = this.props;

    this.container = document.querySelector(`[data-section-name=${name}]`);
    this.container.appendChild(this.el);
  }

  componentWillUnmount() {
    this.container.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
