import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { searchHistoryAtom } from "@/store";
import { removeFromHistory } from "@/lib/userData"; // ✅ Import removeFromHistory
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from "@/styles/History.module.css";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // ✅ Prevent rendering if searchHistory is not yet loaded
  if (!searchHistory) return null;

  // Parse search history into key-value objects
  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  // Handle clicking on a search history item (navigates to search result)
  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // ✅ Updated: Make removeHistoryClicked async & use removeFromHistory
  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation(); // Prevent triggering parent events
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  };

  return (
    <div className="container">
      <h1>Search History</h1>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>Nothing Here. Try searching for some artwork!</Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem} // Apply hover styles
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
