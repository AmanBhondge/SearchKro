import React, { useState, useEffect } from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import { ChevronRight, X, Plus, Pencil, Save, Trash2 } from "lucide-react";
import { getFaqs, UpdateFaqs, DeleteFaqs, postFaqs } from "../../utils/AxiosApi";

const LegalPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedFaq, setEditedFaq] = useState({ question: "", answer: "" });
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await getFaqs();

      console.log(response);

      if (Array.isArray(response.data)) {
        setFaqs(response.data);
        console.log(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setFaqs(response.data.data);
      } else {
        setFaqs([]);
      }

      setLoading(false);
    } catch (err) {
      setError("Failed to load FAQs. Please try again later.");
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditClick = (faq) => {
    setEditMode(true);
    setEditedFaq({ ...faq });
  };

  const handleSaveEdit = async () => {
    try {
      await UpdateFaqs(editedFaq._id, editedFaq);
      setEditMode(false);
      fetchFaqs();
    } catch (err) {
      setError("Failed to update FAQ. Please try again.");
    }
  };

  const showDeleteConfirmation = (id) => {
    setFaqToDelete(id);
    setDeleteConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    setFaqToDelete(null);
    setDeleteConfirmation(false);
  };

  const confirmDelete = async () => {
    try {
      await DeleteFaqs(faqToDelete);
      fetchFaqs();
      setActiveIndex(null);
      hideDeleteConfirmation();
    } catch (err) {
      setError("Failed to delete FAQ. Please try again.");
      hideDeleteConfirmation();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFaq({ ...editedFaq, [name]: value });
  };

  const handleNewFaqChange = (e) => {
    const { name, value } = e.target;
    setNewFaq({ ...newFaq, [name]: value });
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setNewFaq({ question: "", answer: "" });
    setFormError("");
  };

  const [formError, setFormError] = useState("");

  const handleAddFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      setFormError("Question and answer are required");
      return;
    }

    try {
      await postFaqs(newFaq);
      setNewFaq({ question: "", answer: "" });
      setShowAddForm(false);
      setFormError("");
      fetchFaqs();
    } catch (err) {
      setFormError("Failed to add FAQ. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F4F7FF]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-300">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9">
              Legal Policy
            </h1>
          </div>
          <Navbar />
        </div>

        <div className="p-4 sm:p-6 md:py-8 flex-1 overflow-auto">
          {deleteConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">Delete Confirmation</h3>
                <p className="mb-6">
                  Are you sure you want to delete this FAQ?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                    onClick={hideDeleteConfirmation}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="w-full max-w-4xl 2xl:max-w-full 2xl:px-12 mx-auto">
            <div className="mb-4 flex justify-end">
              <button
                className="flex items-center  text-white px-4 py-2 rounded-lg bg-black"
                onClick={toggleAddForm}
              >
                <Plus size={18} className="mr-2" /> Add New FAQ
              </button>
            </div>

            {showAddForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Add New FAQ</h3>
                    <button onClick={toggleAddForm}>
                      <X size={20} />
                    </button>
                  </div>
                  {formError && (
                    <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg">
                      {formError}
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Question
                    </label>
                    <input
                      type="text"
                      name="question"
                      value={newFaq.question}
                      onChange={handleNewFaqChange}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Enter question"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium">
                      Answer
                    </label>
                    <textarea
                      name="answer"
                      value={newFaq.answer}
                      onChange={handleNewFaqChange}
                      className="w-full p-3 border rounded-lg"
                      rows="5"
                      placeholder="Enter answer"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      className="flex items-center bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                      onClick={toggleAddForm}
                    >
                      <X size={16} className="mr-2" /> Cancel
                    </button>
                    <button
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                      onClick={handleAddFaq}
                    >
                      <Save size={16} className="mr-2" /> Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
                <button className="float-right" onClick={() => setError(null)}>
                  <X size={16} />
                </button>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading FAQs...</div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-8">No FAQs available</div>
            ) : (
              faqs.map((faq, index) => (
                <div key={index} className="mb-2">
                  {index === activeIndex ? (
                    <div className="bg-black text-white p-4 rounded-lg">
                      {editMode && activeIndex === index ? (
                        <div>
                          <div className="mb-3">
                            <label className="block mb-1 text-sm font-medium">
                              Question
                            </label>
                            <input
                              type="text"
                              name="question"
                              value={editedFaq.question}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded text-black"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="block mb-1 text-sm font-medium">
                              Answer
                            </label>
                            <textarea
                              name="answer"
                              value={editedFaq.answer}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded text-black"
                              rows="4"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              className="flex items-center bg-gray-600 text-white px-3 py-1 rounded"
                              onClick={() => setEditMode(false)}
                            >
                              <X size={16} className="mr-1" /> Cancel
                            </button>
                            <button
                              className="flex items-center bg-blue-500 text-white px-3 py-1 rounded"
                              onClick={handleSaveEdit}
                            >
                              <Save size={16} className="mr-1" /> Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <div className="flex-1 pr-2 2xl:p-2">
                            <p className="font-bold text-base sm:text-lg md:text-xl">
                              {faq.question}
                            </p>
                            <p className="text-sm sm:text-base mt-2">
                              {faq.answer}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Pencil
                              className="mr-3 cursor-pointer hover:text-gray-300"
                              size={19}
                              onClick={() => handleEditClick(faq)}
                            />
                            <Trash2
                              className="mr-3 cursor-pointer hover:text-gray-300"
                              size={19}
                              onClick={() => showDeleteConfirmation(faq._id)}
                            />
                            <X
                              className="cursor-pointer flex-shrink-0 hover:text-gray-300"
                              onClick={() => setActiveIndex(null)}
                              size={20}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className="w-full text-sm sm:text-base md:text-lg bg-gray-200 text-left p-3 sm:p-4 rounded-lg flex justify-between items-center"
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="line-clamp-1 pr-2">{faq.question}</span>
                      {faq.answer ? (
                        <ChevronRight size={20} className="flex-shrink-0" />
                      ) : (
                        <Plus size={20} className="flex-shrink-0" />
                      )}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPolicy;
