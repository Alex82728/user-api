import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { readToken } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/register"]; 

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  
  async function updateAtoms() {
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  useEffect(() => {
    const authToken = readToken();

    // If user is not logged in and route is private, redirect to login
    if (!authToken && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push("/login");
    } else {
      updateAtoms(); 
    }
  }, [router.pathname]);

  return children;
}
