import { useState } from "react";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
  const [chartExample1Data, setChartExample1Data] = useState(chartExample1.data);
  const [chartExample1Options, setChartExample1Options] = useState(chartExample1.options);
  const [chartName, setChartName] = useState('Click on a stock')
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [predictedPrice, setPredictedPrice] = useState('')
  const [accuracy, Accuracy] = useState('')
  const [upDownCurrent, setUpDownCurrent] = useState('')
  const [upDownPredicted, setUpDownPredicted] = useState('')
  const [upDownCurrentSince, setUpDownCurrentSince] = useState('')
  const [upDownPredictedCurrent, setUpDownPredictedCurrent] = useState('')
  

  

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
    fetch('http://localhost:8000/apis/'+index+'/').then((response)=>{
      console.log(response.status)
      if (response.status>=400){
        setErrorMessage('Unable to connect to the backend, please check')
      }
      return response.json()
    }).then((data)=>{
      setErrorMessage('')
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
                    {!errorMessage && <h2 className="text-white mb-0">{chartName}</h2>}
                    {errorMessage && <h2 className="text-white mb-0">{errorMessage}</h2>}
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
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'adida')}>
                    <th scope="row">Adidas</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'acn')}>
                    <th scope="row">Accenture</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'adobe')}>
                    <th scope="row">Adobe</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'amazon')}>
                    <th scope="row">Amazon</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'cisco')}>
                    <th scope="row">Cisco</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'colgate')}>
                    <th scope="row">Colgate</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'fb')}>
                    <th scope="row">Facebook</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'fortis')}>
                    <th scope="row">Fortis</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'hero')}>
                    <th scope="row">HeroMotoCorp</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'ibm')}>
                    <th scope="row">IBM</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'johnson')}>
                    <th scope="row">Johnson and Johnson</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'jp')}>
                    <th scope="row">JP Morgan</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'maruti')}>
                    <th scope="row">Maruti Suzuki</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'netflix')}>
                    <th scope="row">Netflix</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'nvidia')}>
                    <th scope="row">Nvidia</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'pepsi')}>
                    <th scope="row">Pepsi</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'tata')}>
                    <th scope="row">Tata</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'tvs')}>
                    <th scope="row">TVS Motors</th>
                    <td>$1.61</td>
                    <td>$1.63</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" />{" "}
                      1.2%
                    </td>
                  </tr>
                  <tr style = {{cursor:'pointer'}} onClick={(e)=>toggleNavs(e,'walmart')}>
                    <th scope="row">Walmart</th>
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
        </Row>
      </Container>
    </>
  );
};

export default Index;
