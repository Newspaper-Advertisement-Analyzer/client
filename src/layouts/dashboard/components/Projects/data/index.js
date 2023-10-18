import { useEffect, useState } from "react";
import { getRecentAd } from "api/searchTable/recentLandSale";
//import MDAvatar from "components/MDAvatar";

// Images

export default function data() {
  const [recentLandAds, setRecentLandAds] = useState([]);
  const [recentHouseAds, setRecentHouseAds] = useState([]);
  const [recentMarriageProp, setRecentMarriageProp] = useState([]);
  useEffect(() => {
    // Call the backend API to get recent advertisement data
    getRecentAd("LandSale") // Replace "land_sale" with the appropriate ad type
      .then((data) => {
        setRecentLandAds(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Call the backend API to get recent advertisement data
    getRecentAd("HouseSale") // Replace "land_sale" with the appropriate ad type
      .then((data) => {
        setRecentHouseAds(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Call the backend API to get recent advertisement data
    getRecentAd("MarriageProp") // Replace "land_sale" with the appropriate ad type
      .then((data) => {
        setRecentMarriageProp(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return {
    landSale: {
      columns: [
        { Header: "#", accessor: "index", width: "5%", align: "left" },
        { Header: "Title", accessor: "title", width: "10%", align: "left" },
        { Header: "Source", accessor: "source", align: "center" },
        { Header: "City", accessor: "city", align: "center" },
        { Header: "Posted Date", accessor: "date", align: "center" },
        //{ Header: "Address", accessor: "address", align: "center" },
        { Header: "PhoneNumber", accessor: "phoneNumber", align: "center" },
        { Header: "Price Per Perch in Rs.", accessor: "price", align: "center" },
      ],

      rows: recentLandAds.map((ad, index) => ({
        index: index + 1,
        title: ad.Title,
        source: ad.Source, // You can choose an appropriate field for the source
        city: ad.Location.City,
        date: ad.Posted_Date,
        address: ad.Location.Address, // Use the correct field for the address
        phoneNumber: ad.Contact_Info.Phone_Number.join(", "), // Join multiple phone numbers if available
        price: ad.Price_per_Perch,
      })),
    },

    houseSale: {
      columns: [
        { Header: "#", accessor: "index", width: "5%", align: "left" },
        { Header: "Title", accessor: "title", width: "10%", align: "left" },
        { Header: "Source", accessor: "source", align: "center" },
        { Header: "City", accessor: "city", align: "center" },
        { Header: "No of Rooms", accessor: "No_of_Rooms", align: "center" },
        { Header: "Posted Date", accessor: "date", align: "center" },
        //{ Header: "Address", accessor: "address", align: "center" },
        { Header: "PhoneNumber", accessor: "phoneNumber", align: "center" },
        { Header: "Price in Rs.", accessor: "price", align: "center" },
      ],

      rows: recentHouseAds.map((ad, index) => ({
        index: index + 1,
        title: ad.Title,
        source: ad.Source, // You can choose an appropriate field for the source
        city: ad.Location.City,
        date: ad.Posted_Date,
        address: ad.Location.Address, // Use the correct field for the address
        phoneNumber: ad.Contact_Info.Phone_Number.join(", "), // Join multiple phone numbers if available
        No_of_Rooms: ad.Number_of_Rooms,
        price: ad.Price,
      })),
    },

    marriageProposals: {
      columns: [
        { Header: "#", accessor: "index", width: "5%", align: "left" },
        { Header: "Title", accessor: "title", width: "10%", align: "left" },
        { Header: "Source", accessor: "source", align: "center" },
        { Header: "City", accessor: "city", align: "center" },
        { Header: "Gender", accessor: "gender", align: "center" },
        { Header: "Age", accessor: "age", align: "center" },
        { Header: "Profession", accessor: "profession", align: "center" },
        { Header: "Posted Date", accessor: "date", align: "center" },
        //{ Header: "Address", accessor: "address", align: "center" },
        { Header: "PhoneNumber", accessor: "phoneNumber", align: "center" },
      ],

      rows: recentMarriageProp.map((ad, index) => ({
        index: index + 1,
        title: ad.Title,
        source: ad.Source, // Assuming Phone_Number is an array
        city: ad.Location.City,
        gender: ad.Gender,
        age: ad.Age,
        profession: ad.Profession,
        date: ad.Posted_Date,
        address: ad.Location.Address,
        phoneNumber: ad.Contact_Info.Phone_Number.join(", "), // Assuming Phone_Number is an array
      })),
    },
  };
}
