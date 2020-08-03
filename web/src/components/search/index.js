import React, { PureComponent } from "react";
import AsyncSelect from "react-select/lib/Async";

class Search extends PureComponent {
  loadOptions = (inputValue, callback) => {
    const { provider } = this.props;
    setTimeout(async _ => {
      const data = await provider(inputValue);
      callback(data);
    }, 1000);
  };

  onChange = item => {
    const { onSelect, onClear } = this.props;
    if (item) {
      onSelect && onSelect(item);
    } else {
      onClear && onClear();
    }
  };

  render() {
    return (
      <div style={{ display: "block", lineHeight: "30px", width: "100%" }}>
        <AsyncSelect
          cacheOptions
          defaultOptions
          placeholder="Busque tópicos por nome"
          isClearable
          isSearchable
          loadOptions={this.loadOptions}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export { Search };
