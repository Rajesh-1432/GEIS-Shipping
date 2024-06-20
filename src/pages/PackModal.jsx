import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";

const PackUnpackModal = ({ getPackTable, setTemp }) => {
  // Initial data for pack and unpack tables
  const initialPackTableData = [
    {
      key: "1",
      hu: "1000077718",
      desc: "CARTON US",
      totalWeight: 50,
      loadingWeight: 48,
      allWeight: "",
      tareWeight: 2,
      unit: "LB",
      volume: 1.57,
    },
    {
      key: "2",
      hu: "1000077719",
      desc: "CARTON US",
      totalWeight: 43,
      loadingWeight: 40,
      allWeight: "",
      tareWeight: 3,
      unit: "LB",
      volume: 1.47,
    },
    {
      key: "3",
      hu: "1000077720",
      desc: "CARTON US",
      totalWeight: 125,
      loadingWeight: 120,
      allWeight: "",
      tareWeight: 5,
      unit: "LB",
      volume: 1.87,
    },
  ];

  const initialUnpackTableData = [
    {
      key: "1",
      material: "THJK436300WLX",
      partialQty: 3,
      totalQty: 3,
      uom: "EA",
      plant: "USW6",
      storg: "WHSE",
      stg: "",
      document: "801963700",
      item: "10",
      desc: "EXPORT CIRCUIT BREAKER #N/A",
    },
    {
      key: "2",
      material: "THJK436300WLX",
      partialQty: 2,
      totalQty: 2,
      uom: "EA",
      plant: "USW6",
      storg: "WHSE",
      stg: "",
      document: "801963700",
      item: "10",
      desc: "EXPORT CIRCUIT BREAKER #N/A",
    },
    {
      key: "3",
      material: "THJK436300WLX",
      partialQty: 20,
      totalQty: 20,
      uom: "EA",
      plant: "USW6",
      storg: "WHSE",
      stg: "",
      document: "801963700",
      item: "30",
      desc: "EXPORT CIRCUIT BREAKER #N/A",
    },
  ];

  // State variables
  const [showPackData, setShowPackData] = useState(false);
  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  const [selectedRowKeys2, setSelectedRowKeys2] = useState([]);
  const [modifiedUnpackTableData, setModifiedUnpackTableData] = useState([]);
  const [packTableData, setPackTableData] = useState(initialPackTableData);
  const [unpackTableData, setUnpackTableData] = useState(
    initialUnpackTableData,
  );

  // Columns configuration for pack and unpack tables
  const packColumns = [
    {
      title: "HU",
      dataIndex: "hu",
      key: "hu",
      width: 120,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: 120,
    },
    {
      title: "Total Weight",
      dataIndex: "totalWeight",
      key: "totalWeight",
      width: 120,
    },
    {
      title: "Loading Weight",
      dataIndex: "loadingWeight",
      key: "loadingWeight",
      width: 120,
    },
    {
      title: "All. Loading Weight",
      dataIndex: "allWeight",
      key: "allWeight",
      width: 120,
    },
    {
      title: "Tare Weight",
      dataIndex: "tareWeight",
      key: "tareWeight",
      width: 120,
    },
    {
      title: "Wgt Unit",
      dataIndex: "unit",
      key: "unit",
      width: 120,
    },
    {
      title: "Total Volume",
      dataIndex: "volume",
      key: "volume",
      width: 120,
    },
  ];

  const unpackColumns = [
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      width: 120,
    },
    {
      title: "Partial Qty",
      dataIndex: "partialQty",
      key: "partialQty",
    },
    {
      title: "Total Qty",
      dataIndex: "totalQty",
      key: "totalQty",
    },
    {
      title: "UoM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "Plant",
      dataIndex: "plant",
      key: "plant",
    },
    {
      title: "StorgL",
      dataIndex: "storg",
      key: "storg",
    },
    {
      title: "Dest.Stg.Loc ",
      dataIndex: "stg",
      key: "stg",
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
  ];

  // useEffect to handle side effects when packTableData changes
  useEffect(() => {
    getPackTable(packTableData);
    setTemp(packTableData);
    console.log("handleUnpackClick: packTableData changed");
  }, [packTableData]);

  // Function to handle the Pack operation
  const handlePackClick = () => {
    const selectedUnPackItems = unpackTableData.filter((item) =>
      selectedRowKeys2.includes(item.key),
    );

    const selectedPackItem = packTableData.find((item) =>
      selectedRowKeys1.includes(item.key),
    );

    if (selectedUnPackItems.length > 0 && selectedPackItem) {
      const totalQty = selectedUnPackItems.reduce(
        (acc, item) => acc + item.totalQty,
        0,
      );
      const partialQty = selectedUnPackItems.reduce(
        (acc, item) => acc + item.partialQty,
        0,
      );

      const temp = packTableData.filter(
        (item) => String(item.key) === String(selectedPackItem.key),
      );
      temp[0].totalWeight = partialQty;
      temp[0].loadingWeight = totalQty;

      const updatedUnpackTableData = unpackTableData.filter(
        (item) => !selectedRowKeys2.includes(item.key),
      );

      setPackTableData(temp);
      setModifiedUnpackTableData(updatedUnpackTableData);
      setShowPackData(true);
      setSelectedRowKeys2([]);
    }
  };

  // Function to handle the Unpack operation
  const handleUnpackClick = () => {
    // Reset pack table data to initial state
    setPackTableData(initialPackTableData);
    setUnpackTableData(initialUnpackTableData); // Reset unpack table data if needed
    setShowPackData(false); // Reset showPackData state if needed
  };

  // Function to handle row selection change for pack table
  const onSelectChange1 = (newSelectedRowKeys) => {
    setSelectedRowKeys1(newSelectedRowKeys);
  };

  // Function to handle row selection change for unpack table
  const onSelectChange2 = (newSelectedRowKeys) => {
    setSelectedRowKeys2(newSelectedRowKeys);
  };

  // Row selection configuration for pack and unpack tables
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
      {/* Pack table */}
      <Table
        dataSource={packTableData.map((item) => ({
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
        dataSource={showPackData ? modifiedUnpackTableData : unpackTableData}
        columns={unpackColumns}
        pagination={false}
        rowSelection={rowSelection2}
      />
    </div>
  );
};

export default PackUnpackModal;
