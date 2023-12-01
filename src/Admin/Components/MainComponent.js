import { createContext, useContext, useState } from "react"

const MainContent = createContext()

export function useMain() {
	return useContext(MainContent)
}

const MainComponent = ({ children }) => {
	const [loadingLogin, setLoadingLogin] = useState(false)
	return (
		<MainContent.Provider value={{ loadingLogin, setLoadingLogin }}>
			{children}
		</MainContent.Provider>
	)
}

export default MainComponent
