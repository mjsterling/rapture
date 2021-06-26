import { useState } from 'react'
import getUpgradeCost from './getUpgradeCost'

export default function useUpCosts(buildings) {
  const [upCosts, setUpCosts] = useState({
    houses: getUpgradeCost('houses', buildings.houses),
    farms: getUpgradeCost('farms', buildings.farms),
    sawmills: getUpgradeCost('sawmills', buildings.sawmills),
    quarries: getUpgradeCost('quarries', buildings.quarries),
    mines: getUpgradeCost('mines', buildings.mines),
    shrines: getUpgradeCost('shrines', buildings.shrines),
})
  const [buildingCache, setBuildingCache] = useState(buildings)
  if (buildings != buildingCache) {
      setUpCosts({
            houses: getUpgradeCost('houses', buildings.houses),
            farms: getUpgradeCost('farms', buildings.farms),
            sawmills: getUpgradeCost('sawmills', buildings.sawmills),
            quarries: getUpgradeCost('quarries', buildings.quarries),
            mines: getUpgradeCost('mines', buildings.mines),
            shrines: getUpgradeCost('shrines', buildings.shrines),
      })
      setBuildingCache(buildings)
  }

  return upCosts
}