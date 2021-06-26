import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import shortNum from './components/logic/shortNum'
import useUpCosts from './components/logic/useUpCosts'

const useStyles = makeStyles({
    app: {
        display: 'flex',
        flexFlow: 'column nowrap',
        backgroundImage: './assets/rapturebg.svg',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
    },
    navbar: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '80vw',
        height: '10vh',
        borderRadius: '5vh',
        backgroundColor: "darkgreen",
        justifyContent: "space-evenly",
        alignItems: 'center',
        padding: '0 1vw 0',
        marginBottom: '10vh',
    },
    techButton: {
        borderRadius: '5vh',
        border: '1px solid white',
        height: '8vh',
        width: '8vh',
        boxSizing: 'border-box',
        padding: '2vh',
    },
    resources: {
        textAlign: 'center',
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '10vw',
        height: '10vh',
        padding: '0 0 0 0',
        color: 'white',
        fontWeight: 'bold',
    },
    progContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '10vh',
        width: '40vw',
        justifyContent: 'space-evenly',
        alignItems: 'space-evenly',
    },
    popProg: {
        position: 'relative',
        textAlign: 'center',
        width: '100%',
        height: '4vh',
        borderRadius: '2vh',
        backgroundColor: 'lightgray',
    },
    popProgFill: {
        height: '4vh',
        borderRadius: '2vh',
        backgroundColor: 'gold',
        position: 'relative',
        left: 0,
        width: props => props.popFillWidth,
    },
    favourProg: {
        position: 'relative',
        textAlign: 'center',
        width: '100%',
        height: '4vh',
        borderRadius: '2vh',
        backgroundColor: 'lightgray',
    },
    favourProgFill: {
        height: '4vh',
        borderRadius: '2vh',
        zIndex: -1,
        backgroundColor: 'red',
        width: props => props.favourFillWidth,
    },
    menu: {
        borderRadius: '5vh',
        border: '1px solid white',
        height: '8vh',
        width: '8vh',
        boxSizing: 'border-box',
        padding: '2vh',
    },
    barStats: {
        position: 'absolute',
        top: '-0.7vh',
        width: '40vw',
        height: '2vh',
        textAlign: 'center',
    },
    buildings: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100vh',
        height: '70vh',
    },
    building: {
        width: '40%',
        height: '10vh',
        borderRadius: '5vh',
        fontSize: '1rem',
    }
})

export default function App() {
    const gameTick = () => {
        setResources({
            food: resources.food + resources.freePop / 4 + buildings.farms 
        })
    }
    const [gameRunning, setGameRunning] = useState(false)
    const [resources, setResources] = useState({
        food: 0,
        wood: 0,
        stone: 0,
        gold: 0,
        freePop: 2,
    })
    const [objectives, setObjectives] = useState({
        totalPop: 2,
        favour: 0,
        popTarget: 100,
        favourTarget: 0,
        popCap: 10,
    })
    const [buildings, setBuildings] = useState({
        houses: 1,
        farms: 0,
        sawmills: 0,
        quarries: 0,
        mines: 0,
        shrines: 0,
    })

    const upCosts = useUpCosts(buildings)

    const fillWidths = {
        popFillWidth: `${Math.floor(objectives.totalPop / objectives.popTarget * 100)}%`,
        favourFillWidth: `${Math.floor(objectives.favour / objectives.favourTarget * 100)}%`
    }
    const classes = useStyles(fillWidths);

    const handlePurchase = type => {
        if (type == 'houses' && resources.wood >= upCosts.houses.wood) {
            setResources({
                wood: resources.wood - upCosts.houses.wood
            })
            setBuildings({ houses: buildings.houses + 1 })

        } else if (type == 'farms' && resources.food >= upCosts.farms.food && resources.wood >= upCosts.farms.wood && resources.freePop >= upCosts.farms.freePop) {
            setResources({
                food: resources.food - upCosts.farms.food,
                wood: resources.wood - upCosts.farms.wood,
                freePop: resources.freePop - upCosts.farms.freePop
            })
            setBuildings({ farms: buildings.farms + 1 })

        } else if (type == 'sawmills' && resources.wood >= upCosts.sawmills.wood && resources.freePop >= upCosts.sawmills.freePop) {
            setResources({
                wood: resources.wood - upCosts.sawmills.wood,
                freePop: resources.freePop - upCosts.sawmills.freePop
            })
            setBuildings({ sawmills: buildings.sawmills + 1 })

        } else if (type == 'quarries' && resources.wood >= upCosts.quarries.wood && resources.freePop >= upCosts.quarries.freePop) {
            setResources({
                wood: resources.wood - upCosts.quarries.wood,
                freePop: resources.freePop - upCosts.quarries.freePop
            })
            setBuildings({ quarries: buildings.quarries + 1 })

        } else if (type == 'mines' && resources.wood >= upCosts.mines.wood && resources.stone >= upCosts.mines.stone && resources.freePop >= upCosts.mines.freePop) {
            setResources({
                wood: resources.wood - upCosts.mines.wood,
                stone: resources.stone = upCosts.mines.stone,
                freePop: resources.freePop - upCosts.mines.freePop
            })
            setBuildings({ mines: buildings.mines + 1 })

        } else if (type == 'shrines' && resources.wood >= upCosts.shrines.wood && resources.stone >= upCosts.shrines.stone && resources.gold >= upCosts.shrines.gold) {
            setResources({
                wood: resources.wood - upCosts.shrines.wood,
                stone: resources.stone - upCosts.shrines.stone,
                gold: resources.gold - upCosts.shrines.gold
            })
            setBuildings({ shrines: buildings.shrines + 1 })
        }
    }

    return (
        <div className={classes.app}>
            <nav className={classes.navbar}>
                <button className={classes.techButton}>
                    Tech Tree
                </button>

                <div className={classes.resources}>
                    <p>{resources.food} 🌾</p>
                    <p>{resources.wood} 🪵</p>
                </div>
                <div className={classes.progContainer}>
                    <div className={classes.popProg}>
                        <p className={classes.barStats}>Population: {objectives.totalPop} ({resources.freePop} free) - Target: {objectives.popTarget}</p>
                        <div className={classes.popProgFill}> </div>
                    </div>
                    <div className={classes.favourProg}>
                        <div className={classes.favourProgFill}> </div>
                        <p className={classes.barStats}>Favour: {objectives.favour} - Target: {objectives.favourTarget}</p>

                    </div>

                </div>
                <div className={classes.resources}>
                    <p>{resources.stone} 🪨</p>
                    <p>{resources.gold} 🪙</p>

                </div>
                <button className={classes.menu}>
                    Menu
                </button>
            </nav>
            <section className={classes.buildings}>
                <button onClick={() => handlePurchase('houses')} className={classes.building}>
                    <p>Houses:   {buildings.houses}</p>
                    <p>Upgrade Cost: {upCosts.houses.wood} 🪵</p>
                </button>
                <button onClick={() => handlePurchase('farms')} className={classes.building}>
                    <p>Farms:    {buildings.farms}</p>
                    <p>Upgrade Cost: {upCosts.farms.wood} 🪵 {upCosts.farms.food} 🌾 {upCosts.farms.freePop} 👥</p>
                </button>
                <button onClick={() => handlePurchase('sawmills')} className={classes.building}>
                    <p>Sawmills: {buildings.sawmills}</p>
                    <p>Upgrade Cost: {upCosts.sawmills.wood} 🪵 {upCosts.sawmills.freePop} 👥</p>
                </button>
                <button onClick={() => handlePurchase('quarries')} className={classes.building}>
                    <p>Quarries: {buildings.quarries}</p>
                    <p>Upgrade Cost: {upCosts.quarries.wood} 🪵 {upCosts.quarries.freePop} 👥</p>
                </button>
                <button onClick={() => handlePurchase('mines')} className={classes.building}>
                    <p>Mines:    {buildings.mines}   </p>
                    <p>Upgrade Cost: {upCosts.mines.wood} 🪵 {upCosts.mines.stone} 🪨 {upCosts.mines.freePop} 👥</p>
                </button>
                <button onClick={() => handlePurchase('shrines')} className={classes.building}>
                    <p>Shrines:  {buildings.shrines} </p>
                    <p>Upgrade Cost: {upCosts.shrines.wood} 🪵 {upCosts.shrines.stone} 🪨 {upCosts.shrines.gold} 🪙</p>
                </button>
            </section>
        </div>
    )
}