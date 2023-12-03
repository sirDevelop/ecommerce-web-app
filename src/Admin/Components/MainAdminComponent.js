import { createContext, useContext, useState } from "react"

const MainAdminContent = createContext()

export function useMain() {
	return useContext(MainAdminContent)
}

const MainAdminComponent = ({ children }) => {
	const [loadingLogin, setLoadingLogin] = useState(false)
	return (
		<MainAdminContent.Provider value={{ loadingLogin, setLoadingLogin }}>
			{children}
		</MainAdminContent.Provider>
	)
}

export default MainAdminComponent
