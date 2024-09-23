import { Button, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import initialPackTableData from "../json/initialPackTableData.json";
import initialUnpackTableData from "../json/initialUnpackTableData.json";
import packColumns from "../json/packColumns.json";
import unpackColumns from "../json/unpackColumns.json";

const PackUnpackModal = ({ getPackTable, setTemp, soNumber }) => {
  console.log("soNumber: ", soNumber);
  // const [soNumber, setSoNumber] = useState(""); // New state for soNumber input
  const [showPackData, setShowPackData] = useState(false);
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  const [selectedRowKeys2, setSelectedRowKeys2] = useState([]);
  const [modifiedUnpackTableData, setModifiedUnpackTableData] = useState([]);
  const [packTableData, setPackTableData] = useState(initialPackTableData);
  console.log("packTableData: ", packTableData);
  const [unpackTableData, setUnpackTableData] = useState(
    initialUnpackTableData
  );

  // Filter data based on the entered soNumber
  const filteredPackTableData = packTableData.filter((item) => {
    const itemSoNumber = String(item.soNumber);
    console.log("Current item soNumber:", itemSoNumber);
    return itemSoNumber === soNumber;
  });
  console.log("filteredPackTableData: ", filteredPackTableData);
  const filteredUnpackTableData = unpackTableData.filter(
    (item) => String(item.soNumber) == soNumber
  );
  console.log("filteredUnpackTableData: ", filteredUnpackTableData);

  useEffect(() => {
    getPackTable(filteredPackTableData); // Use filtered data
    // setTemp(filteredPackTableData);
  }, [filteredPackTableData]);

  const handlePackClick = () => {
    const selectedUnPackItems = unpackTableData.filter((item) =>
      selectedRowKeys2.includes(item.key)
    );
    const selectedPackItem = packTableData.find((item) =>
      selectedRowKeys1.includes(item.key)
    );

    if (selectedUnPackItems.length > 0 && selectedPackItem) {
      const totalQty = selectedUnPackItems.reduce(
        (acc, item) => acc + item.totalQty,
        0
      );
      const partialQty = selectedUnPackItems.reduce(
        (acc, item) => acc + item.partialQty,
        0
      );

      const temp = packTableData.filter(
        (item) => String(item.key) === String(selectedPackItem.key)
      );
      temp[0].totalWeight = partialQty;
      temp[0].loadingWeight = totalQty;

      const updatedUnpackTableData = unpackTableData.filter(
        (item) => !selectedRowKeys2.includes(item.key)
      );

      setPackTableData(temp);
      setModifiedUnpackTableData(updatedUnpackTableData);
      setShowPackData(true);
      setSelectedRowKeys2([]);
    }
  };

  const handleUnpackClick = () => {
    setPackTableData(initialPackTableData);
    setUnpackTableData(initialUnpackTableData);
    setShowPackData(false);
  };

  const onSelectChange1 = (newSelectedRowKeys) => {
    setSelectedRowKeys1(newSelectedRowKeys);

    // Find the selected row data from filteredPackTableData
    const selectedRowData = filteredPackTableData.find(
      (item) => item.key === newSelectedRowKeys[0]
    );

    // Pass the selected row data to setTemp in the desired structure
    if (selectedRowData) {
      setTemp([selectedRowData]); // Wrap the selected row data in an array
    }
  };

  const onSelectChange2 = (newSelectedRowKeys) => {
    setSelectedRowKeys2(newSelectedRowKeys);
  };

  const rowSelection1 = {
    selectedRowKeys: selectedRowKeys1,
    onChange: onSelectChange1,
  };

  const rowSelection2 = {
    selectedRowKeys: selectedRowKeys2,
    onChange: onSelectChange2,
  };

  return (
    <div>
      {/* <Input
        placeholder="Enter SO Number"
        value={soNumber}
        onChange={(e) => setSoNumber(e.target.value)}
      /> */}

      {/* Pack table */}
      <Table
        dataSource={filteredPackTableData.map((item) => ({
          ...item,
          totalWeight:
            selectedRowKeys1.includes(item.key) && showPackData
              ? item.totalWeight
              : undefined,
          loadingWeight:
            selectedRowKeys1.includes(item.key) && showPackData
              ? item.loadingWeight
              : undefined,
          allWeight:
            selectedRowKeys1.includes(item.key) && showPackData
              ? item.allWeight
              : undefined,
          tareWeight:
            selectedRowKeys1.includes(item.key) && showPackData
              ? item.tareWeight
              : undefined,
          unit:
            selectedRowKeys1.includes(item.key) && showPackData
              ? item.unit
              : undefined,
          volume:
            selectedRowKeys1.includes(item.key) && showPackData
              ? item.volume
              : undefined,
        }))}
        columns={packColumns}
        pagination={false}
        rowSelection={{
          ...rowSelection1,
          type: "radio",
        }}
      />

      {/* Pack and Unpack buttons */}
      <span className="flex gap-4 mt-4 mb-4">
        <Button onClick={handlePackClick}>Pack</Button>
        <Button type="default" onClick={handleUnpackClick}>
          Unpack
        </Button>
      </span>

      {/* Unpack table */}
      <Table
        dataSource={
          showPackData ? modifiedUnpackTableData : filteredUnpackTableData
        }
        columns={unpackColumns}
        pagination={false}
        rowSelection={rowSelection2}
      />
    </div>
  );
};

export default PackUnpackModal;
