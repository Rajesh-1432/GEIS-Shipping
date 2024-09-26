import {
  AuditOutlined,
  BorderTopOutlined,
  DiffOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  notification,
  Radio,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import PackUnpackModal from "./PackModal";
import moment from "moment";
import Picture1 from "../assets/Picture1.png";
import soData from "../json/soData.json";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const [isShipFedexModalOpen, setIsShipFedexModalOpen] = useState(false);
  const [isShipLtlModalOpen, setIsShipLtlModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [value, setValue] = useState(1);
  const [delivery, setDelivery] = useState("");

  const [serviceType, setServiceType] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [showLtlMessages, setShowLtlMessages] = useState(false);
  const [messages, setMessages] = useState("0");

  const [dataSource, setDataSource] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [shippingPackTable, setShippingPackTable] = useState([]);
  const [trackingValue, setTrackingValue] = useState("");

  const [temp, setTemp] = useState([]);
  const [ltlInputValue, setLtlInputValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [packTableDataFromModal, setPackTableDataFromModal] = useState([]);

  const [updatedDataSource, setUpdatedDataSource] = useState(dataSource);

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setFilterData([]);
  };
  const handleGetPackData = (packData) => {
    setPackTableDataFromModal(packData);
    console.log("Pack table data received in parent:", packData);
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
  //     // If ID is not found, display a messages
  //     messages.error({
  //       content: "wrong value!",
  //       key,
  //       duration: 2,
  //     });
  //     // You can display a messages using a notification or set a state to display a messages in your UI
  //   }
  //   setInputValue(""); // Clear input value after adding row
  // };

  const handleInputChange = (e, key, dataIndex) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      newData[index][dataIndex] = e.target.value;
      setDataSource(newData);
    }
  };

  const handlePressEnter = (key, dataIndex, newValue) => {
    const newData = updatedDataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [dataIndex]: newValue };
      }
      return item;
    });

    setUpdatedDataSource(newData);

    // Show success messages
    messages.success("Value updated");
  };

  // Step 3: Function to open modal

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
      width: 110,
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
      width: 70,
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
      // render: (text, record) => (
      //   <Input
      //     value={record.material}
      //     onChange={(e) => handleInputChange(e, record.key, "material")}
      //     variant="borderless"
      //   />
      // ),
      width: 135,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      // render: (text, record) => (
      //   <Input
      //     value={record.desc}
      //     onChange={(e) => handleInputChange(e, record.key, "desc")}
      //     variant="borderless"
      //   />
      // ),
      width: 135,
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
      width: 80,
    },
    {
      title: "Pick Qty",
      dataIndex: "pickqty",
      key: "pickqty",
      render: (text, record) => (
        <Input
          value={record.pickqty}
          onChange={(e) => handleInputChange(e, record.key, "pickqty")}
          onPressEnter={(e) =>
            handlePressEnter(record.key, "pickqty", e.target.value)
          }
          variant="borderless"
        />
      ),
      width: 70,
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
      // render: (text, record) => (
      //   <Input
      //     value={record.pickqty}
      //     onChange={(e) => handleInputChange(e, record.key, "pickqty")}
      //     variant="borderless"
      //   />
      // ),
    },
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      // render: (text, record) => (
      //   <Input
      //     value={record.pickqty}
      //     onChange={(e) => handleInputChange(e, record.key, "pickqty")}
      //     variant="borderless"
      //   />
      // ),
    },
  ];

  const packTableColumns = [
    {
      title: "HU",
      dataIndex: "hu",
      key: "hu",
      width: 120,
    },
    {
      title: "Weight",
      dataIndex: "totalWeight",
      key: "totalWeight",
    },
    {
      title: "UoM",
      dataIndex: "unit",
      key: "unit",
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

  const handleRowClick = (record) => {
    // Start a timeout for 10 seconds
    setModalVisible(false);
    setLoading2(true);
    setTimeout(() => {
      // Code to execute after the delay
      setShippingPackTable(temp);
      setLoading2(false);
    }, 2500); // 2.5-second delay
  };

  const key = "updatable";
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreateShpmnt = () => {
    setLoading(true); // Set loading to true when enter is hit

    setTimeout(() => {
      const validInputs = {
        150085599: "801963700",
        150085638: "801963701",
        4700632105: "801963702",
        150085598: "801963705",
      };

      if (validInputs[inputValue]) {
        // Reset filterData before filtering
        const filter = soData.filter((d) => d.sosto == inputValue);
        setFilterData(filter);

        // Delay the delivery update by an additional 3 seconds
        setTimeout(() => {
          setDelivery(validInputs[inputValue]);
          setLoading(false); // Stop loading after setting delivery
        }, 3000);
      } else {
        // Show notification for invalid input
        messageApi.open({
          type: "error",
          content: "Please enter a valid input.",
        });
        setLoading(false); // Stop loading immediately in the else case
      }
    }, 1000); // Initial 1-second delay for filtering data
  };
  useEffect(() => {
    setDataSource(filterData);
  }, [filterData]);

  const onDelivered = () => {
    messages.loading({
      content: "Loading...",
      key,
    });
    setTimeout(() => {
      messages.success({
        content: "Delivered!",
        key,
        duration: 2,
      });
    }, 1000);
  };
  const onComplete = () => {
    messages.loading({
      content: "Loading...",
      key,
    });
    setTimeout(() => {
      messages.success({
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
  // Check if any row has pickqty === 0
  const showModal = () => {
    const isPickQtyZero = dataSource.some((record) => record.pickqty == 0);

    if (isPickQtyZero) {
      notification.error({
        messages: "Error",
        description: "Pick quantity cannot be zero.",
      });
    } else {
      // Otherwise, show the modal
      setModalVisible(true);
    }
  };

  // Step 3: Function to close modal
  const handleCancel = () => {
    setModalVisible(false);
  };
  const [loadingInput, setLoadingInput] = useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false,
    input5: false,
  });

  const handleInputDelay = (name, value) => {
    console.log(`Input ${name} changed to ${value}. Starting delay...`);

    setLoadingInput((prev) => ({ ...prev, [name]: true })); // Start spinner for specific input

    // Simulate delay (e.g., for API call)
    setTimeout(() => {
      console.log(`Updating input ${name} after delay...`);

      setInputValues((prev) => ({ ...prev, [name]: value })); // Update input value
      setLoadingInput((prev) => ({ ...prev, [name]: false })); // Stop spinner

      console.log(`Input ${name} updated to ${value}. Loading complete.`);
    }, 2000); // 2-second delay
  };

  return (
    <div
      style={{
        // background: "linear-gradient(#d2e8fd, #ffdfe2)",
        height: "100vh",
        display: "flex",
      }}
    >
      {" "}
      {contextHolder}
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
              onClick={() => {
                setIsShipModalOpen(false);
                setIsShipLtlModalOpen(true);
              }}
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
      {/* ltl modal */}
      <Modal
        title="Ltl Service"
        open={isShipLtlModalOpen}
        onOk={() => {
          setIsShipLtlModalOpen(false);
        }}
        onCancel={() => setIsShipLtlModalOpen(false)}
        width={300}
        footer={null}
      >
        <div className="">
          <Input
            placeholder="Enter here"
            value={ltlInputValue}
            onChange={(e) => setLtlInputValue(e.target.value)}
            className="mb-2"
          />

          {/* Save button */}
          <Button
            onClick={(e) => {
              // Perform your save logic here
              setIsShipLtlModalOpen(false);

              setTimeout(() => {
                if (shippingPackTable.length > 0) {
                  const updatedTable = shippingPackTable.map((row) => ({
                    ...row,
                    tracking: ltlInputValue, // Update tracking for the first row
                  }));

                  // Update the state with the new data
                  setShippingPackTable(updatedTable);

                  // Update messages after successful tracking update
                  setMessages("Tracking value updated successfully!");
                }
              }, 5000); // 5 seconds delay
              // Show messages after 1 second
              setTimeout(() => {
                setMessages("1");
                setShowLtlMessages(true);
              }, 1000);

              // Clear the input field after saving
              // setLtlInputValue("");
            }}
          >
            Save
          </Button>
          <Button onClick={() => setIsShipLtlModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>
      {/* fedex Modal */}
      <Modal
        title="Fedex Service"
        open={isShipFedexModalOpen}
        onOk={() => {
          setIsShipFedexModalOpen(false);
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
                setMessages("1");

                setShowMessages(true);
              }, 1000);
            }}
            className="w-full mt-4"
          >
            Service
          </Button>
        </div>
      </Modal>
      {/* ltl modal for messages */}
      <Modal
        title="Ltl Service"
        open={showLtlMessages}
        footer={null}
        onCancel={() => setShowLtlMessages(false)}
        width={200}
      >
        <div className="flex flex-col items-center justify-between w-full">
          {messages === "1" && <div>Call to Ltl sever initiated</div>}
          {messages === "2" && "Ltl label printed"}
          {messages === "3" && "Post Good issued"}
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => {
            console.log("messages: ", messages);
            if (messages === "4") {
              setIsShipLtlModalOpen(false);
              return;
            }

            if (messages === "3") {
              setInputValues({
                input1: "04",
                input2: "UPS",
                input3: "SE",
                input4: "45102E",
                // input5: "IND",
              });

              setShowLtlMessages(false);
              return;
            }

            setShowLtlMessages(false);
            setTimeout(() => {
              setShowLtlMessages(true);
              messages == "1" && setMessages("2");
              messages == "2" && setMessages("3");
              messages == "3" && setMessages("4");
            }, 1000);
          }}
        >
          OK
        </Button>
      </Modal>
      {/* fedex modal for messages */}
      <Modal
        title="Fedex Service"
        open={showMessages}
        footer={null}
        onCancel={() => setShowMessages(false)}
        width={200}
      >
        <div className="flex flex-col items-center justify-between w-full">
          {messages === "1" && <div>Call to fedex sever initiated</div>}
          {messages === "2" && "Fedex label printed"}
          {messages === "3" && "Post Good issued"}
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => {
            console.log("messages: ", messages);
            if (messages === "4") {
              setIsShipFedexModalOpen(false);
              return;
            }

            if (messages === "3") {
              setInputValues({
                input1: "04",
                input2: serviceType,
                input3: "SE",
                input4: "45102E",
                input5: "IND",
              });

              setShowMessages(false);
              return;
            }

            setShowMessages(false);
            setTimeout(() => {
              setShowMessages(true);
              messages == "1" && setMessages("2");
              messages == "2" && setMessages("3");
              messages == "3" && setMessages("4");
            }, 1000);
          }}
        >
          OK
        </Button>
      </Modal>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 34,
            display: "flex",
            justifyContent: "center",
            color: "#117ca7",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px 20px", // Adjust padding as needed
          }}
        >
          <span style={{ alignSelf: "flex-start" }}>
            <img src={Picture1} alt={Picture1} className="w-[100px] h-12" />
          </span>
          <span style={{ marginLeft: "auto", marginRight: "auto" }}>
            Shipping Simplification
          </span>
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
              Select Date{" "}
              <DatePicker defaultValue={moment()} style={{ marginLeft: 8 }} />
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
                onPressEnter={handleCreateShpmnt}
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
            <span
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "red",
                  // width: "90%",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </Button>

              <Button
                style={{
                  color: "white",
                  // backgroundColor: "#117ca7",
                  backgroundColor: "red",

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
                width={"70%"}
              >
                <PackUnpackModal
                  getPackTable={handleGetPackData}
                  setTemp={setTemp}
                  soNumber={inputValue}
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
                style={{
                  color: "white",
                  //  backgroundColor: "#0f7d1f"
                  backgroundColor: "red",
                }}
              >
                Create Shipment <FileAddOutlined style={{ color: "white" }} />
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
                  loading={loading}
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
                        <Input value={"Z04"} id="input1"></Input>{" "}
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
                        <Input id="input2" defaultValue={0}></Input>{" "}
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
                    className="flex items-center justify-between"
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      borderBottom: "2px solid #1890ff",
                    }}
                  >
                    <div>Shipping</div>
                    <Button
                      icon={<FileAddOutlined />}
                      size="small"
                      onClick={() => setIsShipModalOpen(true)}
                      style={{ color: "white", backgroundColor: "red" }}
                    >
                      SHIP
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ marginTop: "22%" }}></div>
                    <div
                      style={{
                        marginTop: 40,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      {["input1", "input2", "input3", "input4"].map(
                        (inputId, index) => (
                          <div
                            key={inputId}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: 5,
                            }}
                          >
                            <label
                              htmlFor={inputId}
                              style={{ width: 100, marginRight: 10 }}
                            >
                              {
                                [
                                  "Ship,Cond",
                                  "Carrier",
                                  "Service Type",
                                  "Truck ID",
                                  // "Address:",
                                ][index]
                              }
                            </label>
                            <Spin
                              spinning={loadingInput[inputId]} // Control loader for each input
                              style={{ marginRight: 10 }}
                            >
                              <Input
                                id={inputId}
                                style={{ width: 200 }}
                                value={inputValues[inputId]} // Controlled input value
                                onChange={(e) =>
                                  handleInputDelay(inputId, e.target.value)
                                } // Delay input change
                              />
                            </Spin>
                          </div>
                        )
                      )}
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
                  dataSource={shippingPackTable}
                  columns={packTableColumns}
                  pagination={false}
                  loading={loading2}
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
                      className="flex flex-row"
                      style={{
                        borderLeft: "2px solid #ccc",
                        padding: 7,
                        marginLeft: 150,
                      }}
                    >
                      <span className="mt-1">Ship To</span>
                      <span className="w-28 h-4 ml-2  ">
                        <Input variant="borderless" className="bg-gray-100" />
                      </span>
                    </div>
                  </div>
                </div>
                {shippingPackTable.length > 0 && (
                  <div>
                    {inputValue === "150085599" && (
                      <span>
                        Gexpro – Woodward Lincoln Campus, Attn: Jay Keller, 5303
                        East 47th Ave STE A, Denver CO 80216, USA
                      </span>
                    )}{" "}
                    {inputValue === "150085598" && (
                      <span>
                        Gexpro – Woodward Lincoln Campus, Attn: Jay Keller, 5303
                        East 47th Ave STE A, Denver CO 80216, USA
                      </span>
                    )}
                    {inputValue === "150085638" && (
                      <span>
                        Walmart, Attn: Kathy Jones, Louisville, KY, United
                        States
                      </span>
                    )}
                    {inputValue === "4700632105" && (
                      <span>
                        Target Sortation Center, Attn: Louis Pale, 2700 Winter
                        St NE, Minneapolis, MN 55413, United States
                      </span>
                    )}
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
                {shippingPackTable.length > 0 && (
                  <div>
                    {inputValue === "150085599" && (
                      <div className="flex flex-col gap-3">
                        <div>
                          1. Orders are processed within 1-2 business days.
                        </div>
                        <div>
                          2. Domestic delivery: Standard (3-5 business days),
                          Expedited (1-3 business days), Overnight (1 business
                          day).
                        </div>

                        <div>
                          3. International delivery: Standard (7-21 business
                          days), Expedited (5-10 business days).
                        </div>
                      </div>
                    )}
                    {inputValue === "150085598" && (
                      <div className="flex flex-col gap-3">
                        <div>
                          1. Orders are processed within 1-2 business days.
                        </div>
                        <div>
                          2. Domestic delivery: Standard (3-5 business days),
                          Expedited (1-3 business days), Overnight (1 business
                          day).
                        </div>

                        <div>
                          3. International delivery: Standard (7-21 business
                          days), Expedited (5-10 business days).
                        </div>
                      </div>
                    )}
                    {inputValue === "150085638" && (
                      <div>Fragile items, only upside</div>
                    )}{" "}
                    {inputValue === "4700632105" && (
                      <div>Fragile items, only upside</div>
                    )}
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
