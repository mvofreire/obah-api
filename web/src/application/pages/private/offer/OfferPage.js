import React, { useEffect, useState } from "react";
import { SectionContentAdminHeader } from "components";
import { message } from "antd";
import {
  loadMyOffers,
  createOffer,
  removeOffer,
  updateOffer,
} from "services/offer";

import OfferForm from "./OfferForm";
import OfferTable from "./OfferTable";

const OfferPage = () => {
  const [offers, setOffers] = useState([]);
  const [editModel, setEditModel] = useState({});

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    const data = await loadMyOffers();
    setOffers(data);
  };

  const handleCreate = async (offer) => {
    await createOffer(offer);
    loadOffers();
  };

  const handleUpdate = async (id, model) => {
    await updateOffer(id, model);
    loadOffers();
  };

  const handleDelete = async (offer) => {
    try {
      await removeOffer(offer.id);
      loadOffers();
      setModalVisible(false);
    } catch (e) {
      message.info("Tente novamente mais tarde");
    }
  };

  const handleEdit = (offer) => {
    setEditModel(offer);
  };

  return (
    <div>
      <SectionContentAdminHeader title="Minhas Promoções" />
      <OfferForm
        handleCreate={handleCreate}
        handleClose={() => setEditModel({})}
        handleUpdate={handleUpdate}
        model={editModel}
      />
      <OfferTable
        data={offers}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default OfferPage;
