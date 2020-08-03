import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { List, Button, Row, Col } from "antd";

class InfiniteList extends PureComponent {
  state = {
    loading: false,
    docs: [],
    hasNextPage: true,
    hasPrevPage: false,
    limit: 5,
    nextPage: 2,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 20,
    totalPages: 2
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { provider } = this.props;
    const { page, limit } = this.state;
    this.setState({ loading: true });
    const data = await provider(page, limit);

    this.setState({
      ...data,
      loading: false
    });
  };

  onLoadMore = async () => {
    const { provider, fakeObj } = this.props;
    const { hasNextPage, nextPage, limit } = this.state;

    if (hasNextPage) {
      const _docs = this.state.docs;
      this.setState({
        loading: true,
        docs: _docs.concat(
          [...new Array(limit)].map(() => ({ loading: true, ...fakeObj }))
        )
      });

      setTimeout(async _ => {
        const { docs, ...data } = await provider(nextPage, limit);
        const newDocs = [..._docs, ...docs];

        this.setState({
          ...data,
          docs: newDocs,
          loading: false
        });
      }, 1000);
    }
  };

  renderLoadMore = () => {
    const { hasNextPage, loading } = this.state;

    return !loading && hasNextPage ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px"
        }}
      >
        <Button onClick={this.onLoadMore}>Carregar mais...</Button>
      </div>
    ) : null;
  };

  renderItemList = props => {
    const { renderItem } = this.props;

    return renderItem(props);
  };

  render() {
    const { loading, docs, totalDocs } = this.state;
    return (
      <Fragment>
        <Row type="flex" justify="end">
          <Col xs={8}>
            <span style={{ float: "right" }}>
              Total de registros: {totalDocs}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              loading={loading}
              loadMore={this.renderLoadMore()}
              dataSource={docs}
              renderItem={this.renderItemList}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

InfiniteList.propTypes = {
  provider: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  fakeObj: PropTypes.object
};

InfiniteList.defaultProps = {
  fakeObj: {}
};

export { InfiniteList };
