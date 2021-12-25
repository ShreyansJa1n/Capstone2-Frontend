import { useState } from "react";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  // Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  // chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState(chartExample1.data);
  const [chartExample1Options, setChartExample1Options] = useState(chartExample1.options);
  const [chartName, setChartName] = useState('Click on a stock')

  

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  var colors = {
    gray: {
      100: "#f6f9fc",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#8898aa",
      700: "#525f7f",
      800: "#32325d",
      900: "#212529",
    },
    theme: {
      default: "#172b4d",
      primary: "#5e72e4",
      secondary: "#f4f5f7",
      info: "#11cdef",
      success: "#2dce89",
      danger: "#f5365c",
      warning: "#fb6340",
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent",
  };

  const toggleNavs = (e, index) => {
    e.preventDefault();
    fetch('http://localhost:8000/apis/'+index+'/').then(response=>response.json()).then((data)=>{
      console.log(data)
      var options = {
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: colors.gray[900],
                  zeroLineColor: colors.gray[900],
                },
                ticks: {
                  callback: function (value) {
                    if (!(value % 10)) {
                      return data['cur'] + value;
                    }
                  },
                },
              },
          ],
      }
    }
      var newData = (canvas) => {
        return {
          labels: data['labels'],
          datasets: [
            {
              label: "Performance",
              data: data['predictions'],
            },
          ],
        };
      }
      setChartExample1Data(newData)
      setChartExample1Options(options)
      setChartName(data.name)
    })
    // setActiveNav(index);

   
  };
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Sales Prediction
                    </h6>
                    <h2 className="text-white mb-0">{chartName}</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1Data}
                    options={chartExample1Options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row className="mt-5">
          <Col >
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Top stocks</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Stock name</th>
                    <th scope="col">Current Stock Price</th>
                    <th scope="col">Predicted Stock Price</th>
                    <th scope="col">Predicted Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'apple')}>
                    <th scope="row">Apple</th>
                    <td>$157.87</td>
                    <td>$142</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" /> 4.69%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'zara')}>
                    <th scope="row">Zara</th>
                    <td>$0.033</td>
                    <td>$0.032</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      3.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'adidas')}>
                    <th scope="row">Adidas</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Index;
