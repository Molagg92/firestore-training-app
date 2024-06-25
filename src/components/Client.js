import React, { useEffect, useState } from "react";
import { db } from '../config/firestore';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import useClientServices from "../hooks/useClientServices";

function Client() {
  const [clientList, setClientList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientAddress, setNewClientAddress] = useState("");
  const [isClientPrimeMem, setIsClientPrimeMem] = useState(true);
  const [selectedService, setSelectedService] = useState("");
  
  // Function to fetch client list
  const fetchClientList = async () => {
    try {
      const clientCollectionRef = collection(db, "Client");
      const data = await getDocs(clientCollectionRef);
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClientList(specificData);
      console.log("Client List: ", specificData); // Debug Log
    } catch (err) {
      console.error("Error fetching clients: ", err);
    }
  };

  // Function to fetch service list
  const fetchServiceList = async () => {
    try {
      const serviceCollectionRef = collection(db, "Service");
      const data = await getDocs(serviceCollectionRef);
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServiceList(specificData);
      console.log("Service List: ", specificData); // Debug log
    } catch (err) {
      console.error("Error fetching services: ", err);
    }
  };

  useEffect(() => {
    fetchClientList();
    fetchServiceList();
  }, []);

  const onSubmitClient = async () => {
    try {
      const clientCollectionRef = collection(db, "Client");
      await addDoc(clientCollectionRef, { 
        phone: newClientPhone,
        address: newClientAddress,
        primeMember: isClientPrimeMem,
      });
      setNewClientPhone("");
      setNewClientAddress("");
      setIsClientPrimeMem(true); // Reset form fields
      fetchClientList(); // Refresh client list
    } catch (err) {
      console.error("Error adding client: ", err);
    }
  };

  const joinClientInService = async (clientId, serviceId) => {
    try {
      const joinEnrollCollectionRef = collection(db, "JoinEnroll");
      await addDoc(joinEnrollCollectionRef, {
        clientId: String(clientId),
        serviceId: String(serviceId),
      });
      alert("Client Enrolled in Service!");
    } catch (err) {
      console.error("Error enrolling client: ", err);
    }
  };

  const handleJoin = async (clientId) => {
    if(selectedService) {
      await joinClientInService(clientId, selectedService);
    } else {
      alert("Please Select a Service.");
    }
  };

  return (
    <div>
      {clientList.map((client) => (
        <ClientDetails
          key={client.id}
          client={client}
          serviceList={serviceList}
          onSubmitClient={onSubmitClient}
          handleJoin={handleJoin}
          setSelectedService={setSelectedService}
        />
      ))}
    </div>
  );
}

const ClientDetails = ({ client, serviceList, onSubmitClient, handleJoin, setSelectedService }) => {
  const clientServices = useClientServices(client.id);

  return (
    <div>
      <h1 style={{ color: client.primeMember ? "green" : "red" }}>{client.phone}</h1>
      <p>address: {client.address}</p>
      <select onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">Select Service</option>
        {serviceList.map((service) => (
          <option key={service.id} value={service.id}>{service.dateTime}</option>
        ))}
      </select>
      <button onClick={() => handleJoin(client.id)}>Enroll in Service</button>

      <h3>Enrolled Services:</h3>
      <ul>
        {clientServices.map((service) => (
          <li key={service.id}>{service.dateTime}</li>
        ))}
      </ul>
    </div>
  );
};

export default Client;
