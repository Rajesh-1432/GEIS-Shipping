import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";

const PackUnpackModal = ({ getPackTable }) => {
  const [showPackData, setShowPackData] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const packTableData = [
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

  const unpackTableData = [
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
  useEffect(() => {
    getPackTable(packTableData);
  }, []);
  const handlePackClick = () => {
    setShowPackData(true);
  };

  const handleUnpackClick = () => {
    setShowPackData(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <Table
        dataSource={packTableData.map((item) => ({
          ...item,
          totalWeight: showPackData ? item.totalWeight : undefined,
          loadingWeight: showPackData ? item.loadingWeight : undefined,
          allWeight: showPackData ? item.allWeight : undefined,
          tareWeight: showPackData ? item.tareWeight : undefined,
          unit: showPackData ? item.unit : undefined,
          volume: showPackData ? item.volume : undefined,
        }))}
        columns={packColumns}
        pagination={false}
      />
      <span className="mt-4 flex gap-4 mb-4">
        {" "}
        <Button onClick={handlePackClick}>Pack</Button>
        <Button type="default" onClick={handleUnpackClick}>
          Unpack
        </Button>
      </span>
      <Table
        dataSource={showPackData ? [] : unpackTableData}
        columns={unpackColumns}
        pagination={false}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default PackUnpackModal;
