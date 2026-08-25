import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";
import { sendChatMessage } from "../services/chatService";

const WELCOME =
  "Bonjour ! Je suis l'assistant d'Abbaci Ceramic. Posez-moi vos questions sur nos faïences, carrelages ou sanitaires.";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "model", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setLoading(true);

    const history = [...messages, { role: "user", text }];
    setMessages(history);

    try {
      const reply = await sendChatMessage(history);
      setMessages([...history, { role: "model", text: reply }]);
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        type="button"
        aria-label="Ouvrir le chat"
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg text-white transition-colors ${
          open ? "bg-stone" : "bg-olive hover:bg-clay"
        }`}
      >
        {open ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Panneau de chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm bg-white rounded-xl shadow-2xl border border-stone/40 flex flex-col overflow-hidden animate-fadeIn">
          <div className="bg-olive text-white px-4 py-3">
            <p className="font-semibold">Assistant Abbaci Ceramic</p>
            <p className="text-xs opacity-80">Réponses en quelques secondes</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 h-80">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-clay text-white rounded-br-sm"
                      : "bg-ivory text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-ivory px-3 py-2 rounded-2xl rounded-bl-sm text-stone text-sm">
                  L'assistant écrit...
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-600" role="alert">
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="border-t flex items-center gap-2 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Votre question..."
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-stone/50 focus:outline-none focus:ring-2 focus:ring-olive/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Envoyer"
              className="p-2 rounded-lg bg-olive text-white hover:bg-clay transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
