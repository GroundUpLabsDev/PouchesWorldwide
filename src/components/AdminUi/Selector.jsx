"use client";
import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableCard = ({ card, index, moveCard, handleDeleteCard, selectedCard, setSelectedCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <label
      ref={(node) => drag(drop(node))}
      className={`relative flex flex-col justify-center items-center gap-4 w-64 p-6 rounded-lg text-center cursor-move transition-all duration-300 border-2 ${
        card.id === selectedCard
          ? "bg-yellow-500 text-white border-yellow-500"
          : "bg-gray-200 text-gray-800 border-gray-300"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      onClick={() => setSelectedCard(card.id)}
    >
      <input type="radio" name="cans" className="hidden" checked={card.id === selectedCard} readOnly />

      {card.bestDeal && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-bl-lg text-xs">
          Best Deal
        </div>
      )}

      <div className="text-lg font-semibold">{card.cans}</div>
      <div className="text-2xl font-bold">{card.price}</div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card selection when deleting
          handleDeleteCard(card.id);
        }}
        className="absolute top-0 left-0 p-2"
      >
        <CircleX size={39} color="red" />
      </button>
    </label>
  );
};

const Selector = ({ onChange, ProductID }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [newCardData, setNewCardData] = useState({ cans: "", price: "", bestDeal: false });

  // Fetch data from the API when the component mounts or when ProductID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pouchesworldwide.com/strapi/api/products?filters[id][$eq]=${ProductID}&populate[Selector][populate]=*`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const selectorData = data.data[0].Selector;
          const transformedCards = selectorData.map((item) => ({
            id: item.id,
            cans: `${item.Cans} Cans`,
            price: `${item.Price}$`,
            bestDeal: item.BestDeal,
          }));
          setCards(transformedCards);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ProductID]);

  // Notify parent component (AdminDashboard) of changes
  useEffect(() => {
    if (onChange) {
      onChange({ selectedCard, cards });
    }
  }, [selectedCard, cards, onChange]);

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  const handleDeleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitNewCard = () => {
    if (!newCardData.cans || !newCardData.price) {
      alert("Please fill in all fields!");
      return;
    }
    if (cards.length >= 4) {
      alert("Maximum of 4 cards allowed!");
      return;
    }

    const newId = cards.length > 0 ? cards[cards.length - 1].id + 1 : 0;
    const newCard = {
      id: newId,
      cans: `${newCardData.cans} Cans`,
      price: `${newCardData.price}$`,
      bestDeal: newCardData.bestDeal,
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setNewCardData({ cans: "", price: "", bestDeal: false });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-6">
        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <DraggableCard
              key={card.id}
              card={card}
              index={index}
              moveCard={moveCard}
              handleDeleteCard={handleDeleteCard}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          ))}
        </div>

        {/* Add New Card Form */}
        <div className="flex items-center mx-auto mt-8 justify-end">
          <div className="border border-gray-300 rounded-lg p-4 flex items-center space-x-4 bg-white">
            <div className="flex flex-col">
              <label htmlFor="cans" className="text-sm font-medium text-gray-700">
                Cans
              </label>
              <input
                type="text"
                name="cans"
                className="border border-gray-300 rounded-md p-2 w-20"
                value={newCardData.cans}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="border border-gray-300 rounded-md p-2 w-20"
                value={newCardData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="bestDeal"
                className="border border-gray-300 rounded-md"
                checked={newCardData.bestDeal}
                onChange={handleInputChange}
              />
              <label htmlFor="bestDeal" className="text-sm font-medium text-gray-700">
                Is Best Deal? {ProductID}
              </label>
            </div>
            <button className="bg-teal-500 text-white font-medium py-2 px-4 rounded-md h-[70px] w-[126px]" onClick={handleSubmitNewCard}>
              Add +
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Selector;