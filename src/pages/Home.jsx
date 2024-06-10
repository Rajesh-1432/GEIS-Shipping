import { useEffect, useState } from "react";
import {
  Table,
  DatePicker,
  Input,
  Button,
  Card,
  Modal,
  message,
  Radio,
} from "antd";
import {
  AuditOutlined,
  DiffOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { ArrowUpDown } from "lucide-react";
 
const data = [
  {
    key: "1",
    sosto: "150085599",
    soline: "SOLine1",
    poline: "211000000145",
    delyline: "DelyLine1",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 10,
    pickqty: 20,
  },
  {
    key: "2",
    sosto: "1000077718",
    soline: "SOLine2",
    poline: "211000000145",
    delyline: "DelyLine2",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 15,
    pickqty: 25,
  },
  {
    key: "3",
    sosto: "150085599",
    soline: "SOLine3",
    poline: "211000000145",
    delyline: "DelyLine1",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 10,
    pickqty: 20,
  },
  {
    key: "4",
    sosto: "1000077718",
    soline: "SOLine2",
    poline: "211000000145",
    delyline: "DelyLine2",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 15,
    pickqty: 25,
  },
  {
    key: "5",
    sosto: "150085599",
    soline: "SOLine1",
    poline: "211000000145",
    delyline: "DelyLine1",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 10,
    pickqty: 20,
  },
  {
    key: "6",
    sosto: "1000077718",
    soline: "SOLine2",
    poline: "211000000145",
    delyline: "DelyLine2",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 15,
    pickqty: 25,
  },
  // {
  //   key: "7",
  //   sosto: "150085599",
  //   soline: "SOLine1",
  //   poline: "211000000145",
  //   delyline: "DelyLine1",
  //   material: "THJK436300WLX",
  //   desc: "EXPORT CIRCUIT BREAKER",
  //   delyqty: 10,
  //   pickqty: 20,
  // },
  {
    key: "8",
    sosto: "1000077718",
    soline: "SOLine2",
    poline: "211000000145",
    delyline: "DelyLine2",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 15,
    pickqty: 25,
  },
  // {
  //   key: "9",
  //   sosto: "150085599",
  //   soline: "SOLine1",
  //   poline: "211000000145",
  //   delyline: "DelyLine1",
  //   material: "THJK436300WLX",
  //   desc: "EXPORT CIRCUIT BREAKER",
  //   delyqty: 10,
  //   pickqty: 20,
  // },
  {
    key: "10",
    sosto: "1000077718",
    soline: "SOLine2",
    poline: "211000000145",
    delyline: "DelyLine2",
    material: "THJK436300WLX",
    desc: "EXPORT CIRCUIT BREAKER",
    delyqty: 15,
    pickqty: 25,
  },
];
 
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const [isShipFedexModalOpen, setIsShipFedexModalOpen] = useState(false);
 
  const [value, setValue] = useState(1);
  const [delivery, setDelivery] = useState("");
 
  const [serviceType, setServiceType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("0");
 
  // Step 2
  // Step 2
  const [table2Data, setTable2Data] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recentIds, setRecentIds] = useState([]);
  const [table2, setTable2] = useState([
    {
      key: "1",
      hu: "1000077718",
    },
    {
      key: "2",
      hu: "1000077719",
    },
    {
      key: "3",
      hu: "1000077720",
    },
    // {
    //   key: "4",
    //   hu: "THJK436300WLX",
    // },
    // {
    //   key: "5",
    //   hu: "THJK436300WLX",
    // },
    // {
    //   key: "6",
    //   hu: "THJK436300WLX",
    // },
  ]);
  const [table1, setTable1] = useState([
    {
      key: "1",
      hu: "1000077718",
      weight: 48,
      uom: "EA",
      tracking: "",
    },
    {
      key: "2",
      hu: "1000077719",
      weight: 43,
      uom: "EA",
      tracking: "",
    },
    {
      key: "3",
      hu: "1000077720",
      weight: 125,
      uom: "EA",
      tracking: "",
    },
    // {
    //   key: "4",
    //   hu: "THJK436300WLX",
    //   weight: 3,
    //   uom: "EA",
    //   tracking: "",
    // },
    // {
    //   key: "5",
    //   hu: "THJK436300WLX",
    //   weight: 2,
    //   uom: "EA",
    //   tracking: "",
    // },
    // {
    //   key: "6",
    //   hu: "THJK436300WLX",
    //   weight: 20,
    //   uom: "EA",
    //   tracking: "",
    // },
    // Add more objects as needed
  ]);
 
  const [tableData, setTableData] = useState([]);
 
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
 
  // const handleAddRow = () => {
  //   // Search for a row in your data based on the SO/STO/ETO ID entered
  //   const foundRow = dataSource.find((row) => row.sosto === inputValue);
  //   if (foundRow) {
  //     // Add the found row to the tableData state
  //     setTableData([...tableData, foundRow]);
 
  //     // Add the entered ID to the recentIds state
  //     setRecentIds([
  //       inputValue,
  //       ...recentIds.filter((id) => id !== inputValue).slice(0, 4),
  //     ]); // Limit to 5 recent IDs
  //   } else {
  //     // If ID is not found, display a message
  //     message.error({
  //       content: "wrong value!",
  //       key,
  //       duration: 2,
  //     });
  //     // You can display a message using a notification or set a state to display a message in your UI
  //   }
  //   setInputValue(""); // Clear input value after adding row
  // };
 
  const [dataSource, setDataSource] = useState([]);
  const [filterData, setFilterData] = useState([]);
 
  const handleInputChange = (e, key, dataIndex) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index][dataIndex] = e.target.value;
      setDataSource(newData);
    }
  };
 
  // Step 3: Function to open modal
  const showModal = () => {
    setModalVisible(true);
  };
 
  // Step 3: Function to close modal
  const handleCancel = () => {
    setModalVisible(false);
  };
  const columns = [
    {
      title: "SO/STO/ETO",
      dataIndex: "sosto",
      key: "sosto",
      render: (text, record) => (
        <Input
          value={record.sosto}
          onChange={(e) => handleInputChange(e, record.key, "sosto")}
          variant="borderless"
        />
      ),
    },
    {
      title: "SO Line",
      dataIndex: "soline",
      key: "soline",
      render: (text, record) => (
        <Input
          value={record.soline}
          onChange={(e) => handleInputChange(e, record.key, "soline")}
          variant="borderless"
        />
      ),
    },
    {
      title: "PO Line",
      dataIndex: "poline",
      key: "poline",
      render: (text, record) => (
        <Input
          value={record.poline}
          onChange={(e) => handleInputChange(e, record.key, "poline")}
          variant="borderless"
        />
      ),
      width: 150,
    },
    {
      title: "Dely Line",
      dataIndex: "delyline",
      key: "delyline",
      render: (text, record) => (
        <Input
          value={record.delyline}
          onChange={(e) => handleInputChange(e, record.key, "delyline")}
          variant="borderless"
        />
      ),
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      render: (text, record) => (
        <Input
          value={record.material}
          onChange={(e) => handleInputChange(e, record.key, "material")}
          variant="borderless"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (text, record) => (
        <Input
          value={record.desc}
          onChange={(e) => handleInputChange(e, record.key, "desc")}
          variant="borderless"
        />
      ),
    },
    {
      title: "Dely Qty",
      dataIndex: "delyqty",
      key: "delyqty",
      render: (text, record) => (
        <Input
          value={record.delyqty}
          onChange={(e) => handleInputChange(e, record.key, "delyqty")}
          variant="borderless"
        />
      ),
    },
    {
      title: "Pick Qty",
      dataIndex: "pickqty",
      key: "pickqty",
      render: (text, record) => (
        <Input
          value={record.pickqty}
          onChange={(e) => handleInputChange(e, record.key, "pickqty")}
          variant="borderless"
        />
      ),
    },
  ];
 
  const packColumn = [
    {
      title: "HU",
      dataIndex: "hu",
      key: "hu",
      width: 120,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "UoM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "Tracking",
      dataIndex: "tracking",
      key: "tracking",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Button onClick={() => handleRowSelect(record)}>Add</Button>
    //   ),
    // },
  ];
  const packData = [
    {
      key: "1",
      hu: "1000077718",
      weight: 48,
      uom: "EA",
      tracking: "Tracking1",
    },
    {
      key: "2",
      hu: "1000077719",
      weight: 43,
      uom: "EA",
      tracking: "Tracking2",
    },
    {
      key: "3",
      hu: "1000077720",
      weight: 125,
      uom: "EA",
      tracking: "Tracking1",
    },
    {
      key: "4",
      hu: "THJK436300WLX",
      weight: 3,
      uom: "EA",
      tracking: "Tracking2",
    },
    {
      key: "5",
      hu: "THJK436300WLX",
      weight: 2,
      uom: "EA",
      tracking: "Tracking1",
    },
    {
      key: "6",
      hu: "THJK436300WLX",
      weight: 20,
      uom: "EA",
      tracking: "Tracking2",
    },
    // Add more objects as needed
  ];
 
  const handleRowClick = (record) => {
    setTable2Data(table2);
    setModalVisible(false);
  };
 
  const key = "updatable";
  const handleCreateShpmnt = () => {
    if (inputValue == "150085599") {
      const filter = data.filter((d) => d.sosto == "150085599");
      setFilterData(filter);
      setDelivery("801963700");
    } else {
      console.log("4700003451");
    }
  };
 
  useEffect(() => {
    setDataSource(filterData);
  }, [filterData]);
 
  const onDelivered = () => {
    message.loading({
      content: "Loading...",
      key,
    });
    setTimeout(() => {
      message.success({
        content: "Delivered!",
        key,
        duration: 2,
      });
    }, 1000);
  };
  const onComplete = () => {
    message.loading({
      content: "Loading...",
      key,
    });
    setTimeout(() => {
      message.success({
        content: "Completed!",
        key,
        duration: 2,
      });
    }, 1000);
  };
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });
 
  // Function to handle clicking the "SHIP" button
  const handleShipClick = () => {
    // Logic to fill the input fields with default values
    // You can modify this logic as per your requirement
    // setInputValues({
    //   input1: "545154",
    //   input2: "FLIGHT",
    //   input3: "SE",
    //   input4: "45102E",
    //   input5: "IND",
    // });
  };
  return (
    <div
      style={{
        background: "linear-gradient(#d2e8fd, #ffdfe2)",
        height: "100vh",
        display: "flex",
      }}
    >
      <Modal
        title="Carrier Selection"
        open={isShipModalOpen}
        onOk={() => {
          console.log("Modal opened");
        }}
        onCancel={() => setIsShipModalOpen(false)}
        width={300}
        footer={null}
      >
        <div className="flex items-center justify-between w-full">
          <Radio.Group
            className="flex flex-col items-start justify-between gap-4"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            <Radio value={1}>LTL</Radio>
            <Radio value={2}>Fedex</Radio>
          </Radio.Group>
          <div className="flex flex-col items-start justify-between w-full gap-2">
            <Button
              onClick={() => setIsShipFedexModalOpen(false)}
              className="w-full"
            >
              Ship LTL
            </Button>
            <Button
              onClick={() => {
                setIsShipModalOpen(false);
                setIsShipFedexModalOpen(true);
              }}
              className="w-full"
            >
              Ship Fedex
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Fedex Service"
        open={isShipFedexModalOpen}
        onOk={() => {
          console.log("Modal opened");
        }}
        onCancel={() => setIsShipFedexModalOpen(false)}
        width={300}
        footer={null}
      >
        <div className="flex flex-col items-center justify-between w-full">
          {[
            "GROUND",
            "NEXT DAY AIR",
            "SECOND DAY AIR",
            "THIRD DAY AIR",
            "PARCEL",
          ].map((type) => (
            <div
              key={type}
              className={`${
                serviceType === type ? "bg-blue-500" : ""
              } cursor-pointer p-[2px] rounded-lg`}
              onClick={() => setServiceType(type)}
            >
              {type}
            </div>
          ))}
          <Button
            onClick={() => {
              setIsShipFedexModalOpen(false);
              setTimeout(() => {
                setMessage("1");
 
                setShowMessage(true);
              }, 1000);
            }}
            className="w-full mt-4"
          >
            Service
          </Button>
        </div>
      </Modal>
      <Modal
        title="Fedex Service"
        open={showMessage}
        footer={null}
        onCancel={() => setShowMessage(false)}
        width={200}
      >
        <div className="flex flex-col items-center justify-between w-full">
          {message === "1" && <div>Call to fedex sever initiated</div>}
          {message === "2" && "Fedex label printed"}
          {message === "3" && "Post Good issued"}
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => {
            console.log("message: ", message);
            if (message === "3") {
              setInputValues({
                input1: "545154",
                input2: serviceType,
                input3: "SE",
                input4: "45102E",
                input5: "IND",
              });
 
              setTable2Data([
                {
                  key: "1",
                  hu: "1000077718",
                  weight: 48,
                  uom: "EA",
                  tracking: "73456897213",
                },
                {
                  key: "2",
                  hu: "1000077719",
                  weight: 43,
                  uom: "EA",
                  tracking: "73456897213",
                },
                {
                  key: "3",
                  hu: "1000077720",
                  weight: 125,
                  uom: "EA",
                  tracking: "73456897213",
                },
              ]);
 
              setShowMessage(false);
              return;
            }
 
            setShowMessage(false);
            setTimeout(() => {
              setShowMessage(true);
              message == "1" && setMessage("2");
              message == "2" && setMessage("3");
            }, 1000);
          }}
        >
          OK
        </Button>
      </Modal>
      <div style={{ flex: 1 }}>
        <div
          style={{
            // padding: 2,
            fontSize: 34,
 
            color: "#117ca7",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            textAlign: "start",
            // marginLeft: 2,
          }}
        >
          <span style={{ marginLeft: 14 }}> Shipping Simplify</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 15,
          }}
        >
          <div
            style={{
              padding: 4,
              display: "flex",
              flexDirection: "row",
 
              gap: 35,
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginLeft: 35,
                fontSize: 15,
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              }}
            >
              Select Date <DatePicker style={{ marginLeft: 8 }} />
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: 15,
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              }}
            >
              SO/STO/ETO{" "}
              <Input
                placeholder="enter here"
                style={{ marginLeft: 8 }}
                value={inputValue}
                onChange={handleInput}
                // onPressEnter={handleAddRow}
              />
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: 16,
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              }}
            >
              Delivery{" "}
              <Input
                value={delivery}
                placeholder="enter here"
                style={{ marginLeft: 8 }}
              />
            </span>
            <span style={{ marginLeft: "10%" }}>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#117ca7",
                  // width: "90%",
                }}
                onClick={showModal}
              >
                Pack/Unpack <DiffOutlined color={"white"} />
              </Button>
              <Modal
                title="Pack/Unpack"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button key="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button
                    className="text-white bg-blue-600 hover:text-black"
                    key="save"
                    onClick={handleRowClick}
                  >
                    Save
                  </Button>,
                ]}
                width={"50%"}
              >
                {/* modal table */}
                <Table
                  size="small"
                  dataSource={table2}
                  columns={packColumn}
                  pagination={false}
                  // onRow={(record) => ({
                  //   onClick: () => {
                  //     handleRowClick(record);
                  //   },
                  // })}
                  style={{ padding: "15px" }}
                  bordered
                />
                <Button
                  onClick={() => {
                    setTable2(table1);
                    setTable1([]);
                  }}
                  icon={<ArrowUpDown />}
                />
                <Table
                  size="small"
                  dataSource={table1}
                  columns={packColumn}
                  pagination={false}
                  // onRow={(record) => ({
                  //   onClick: () => {
                  //     handleRowClick(record);
                  //   },
                  // })}
                  style={{ padding: "15px" }}
                  bordered
                />
              </Modal>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                marginLeft: 10,
              }}
            >
              <Button
                onClick={handleCreateShpmnt}
                style={{ color: "white", backgroundColor: "#0f7d1f" }}
              >
                Create Shipment <FileAddOutlined style={{ color: "white" }} />
              </Button>
              <Button
                onClick={onDelivered}
                style={{ color: "white", backgroundColor: "#0f7d1f" }}
              >
                Deliveries <FormOutlined style={{ color: "white" }} />
              </Button>
              <Button
                onClick={onComplete}
                style={{
                  color: "white",
                  backgroundColor: "#0f7d1f",
                  // width: 18,
                }}
              >
                Shipment Complete
                <FileDoneOutlined style={{ color: "white" }} />
              </Button>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "row",
              padding: 10,
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "65%",
 
                gap: 20,
 
                // bacEAroundColor: "red",
                padding: 15,
              }}
            >
              <span
                style={{
                  padding: 15,
                  height: "55%",
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {" "}
                {/* table 1 */}
                <Table
                  size="small"
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  scroll={{ y: 300 }}
                />
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: 2,
 
                  height: "295px",
                }}
              >
                <Card
                  style={{
                    width: "50%",
                    borderRight: "1px solid #ccc",
                    paddingRight: 8,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      borderBottom: "2px solid #1890ff",
                    }}
                  >
                    Freight
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        marginTop: 80,
                        display: "flex",
                        flexDirection: "row", // Changed flexDirection to column
                        justifyContent: "center", // Added alignItems to center labels horizontally
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontWeight: 600,
                        }}
                      >
                        <label htmlFor="input1">Spl.Proc.Indi</label>{" "}
                        {/* Added label */}
                        <Input id="input1"></Input>{" "}
                        {/* Added id for linking with label */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontWeight: 600,
                        }}
                      >
                        <label htmlFor="input2">Freight Cost</label>{" "}
                        {/* Added label */}
                        <Input id="input2" defaultValue={234}></Input>{" "}
                        {/* Added id for linking with label */}
                      </div>
                    </div>
                    <div style={{ marginTop: 10, marginLeft: "68%" }}>
                      <Button>
                        Update <AuditOutlined />
                      </Button>
                    </div>
                  </div>
                </Card>
                <Card
                  style={{
                    width: "50%",
                    paddingLeft: 8,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      borderBottom: "2px solid #1890ff",
                    }}
                  >
                    Shipping
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ marginTop: "22%" }}>
                      <Button
                        onClick={() => setIsShipModalOpen(true)}
                        style={{ backgroundColor: "" }}
                      >
                        SHIP <FileAddOutlined />
                      </Button>
                    </div>
                    <div
                      style={{
                        marginTop: 40,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label
                          htmlFor="input1"
                          style={{ width: 100, marginRight: 10 }}
                        >
                          Ship,Cond
                        </label>
                        <Input
                          id="input1"
                          style={{ width: 200 }}
                          value={inputValues.input1}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              input1: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label
                          htmlFor="input2"
                          style={{ width: 100, marginRight: 10 }}
                        >
                          Carrier
                        </label>
                        <Input
                          id="input2"
                          style={{ width: 200 }}
                          value={inputValues.input2}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              input2: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label
                          htmlFor="input3"
                          style={{ width: 100, marginRight: 10 }}
                        >
                          Service Type
                        </label>
                        <Input
                          id="input3"
                          style={{ width: 200 }}
                          value={inputValues.input3}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              input3: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label
                          htmlFor="input4"
                          style={{ width: 100, marginRight: 10 }}
                        >
                          Truck ID
                        </label>
                        <Input
                          id="input4"
                          style={{ width: 200 }}
                          value={inputValues.input4}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              input4: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div
                        style={{
                          marginBottom: 20,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <label
                          htmlFor="input5"
                          style={{ width: 100, marginRight: 10 }}
                        >
                          Address:
                        </label>
                        <Input
                          id="input5"
                          style={{ width: 200 }}
                          value={inputValues.input5}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              input5: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            {/* table 2 */}
            <span
              style={{
                width: "32%",
 
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: 4,
                marginTop: 12,
              }}
            >
              <span
                style={{
                  height: "36%",
                  border: "2px",
                  backgroundColor: "white",
                  padding: 12,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {" "}
                {/* table 2 */}
                <Table
                  dataSource={table2Data}
                  columns={packColumn}
                  pagination={false}
                  scroll={{ y: 100 }}
                />
              </span>
 
              <Card
                style={{
                  height: "200px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    borderBottom: "2px solid #1890ff",
                    padding: "2px",
                    fontWeight: 600,
                  }}
                >
                  <div className="flex">
                    <div>
                      {" "}
                      <div>Shipping Address</div>
                    </div>
 
                    <div
                      style={{
                        borderLeft: "2px solid #ccc",
                        padding: 7,
                        marginLeft: 150,
                      }}
                    >
                      Ship To
                    </div>
                  </div>
                </div>
                {table2Data.length > 0 && (
                  <div>
                    <span>
                      Gexpro – Woodward Lincoln Campus, Attn: Jay Keller, 5303
                      East 47th Ave STE A, Denver CO 80216, USA
                    </span>
                  </div>
                )}
              </Card>
              <Card
                style={{
                  height: "193px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    borderBottom: "2px solid #1890ff",
                    padding: "2px",
                    fontWeight: 600,
                  }}
                >
                  Shipping Instruction
                </div>
                {table2Data.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <div>1. Orders are processed within 1-2 business days.</div>
                    <div>
                      2. Domestic delivery: Standard (3-5 business days),
                      Expedited (1-3 business days), Overnight (1 business day).
                    </div>
 
                    <div>
                      3. International delivery: Standard (7-21 business days),
                      Expedited (5-10 business days).
                    </div>
                  </div>
                )}
              </Card>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                marginTop: 40,
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Home;