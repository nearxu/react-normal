// float routes

export const onFloatRoutes = (routes,key="children") => {
    return routes.reduce((pre,cur) => {
        let clone = pre.concat()
        if(cur[key]){
            // eslint-disable-next-line no-unused-vars
            clone = clone.concat(onFloatRoutes(cur[key]))
        }else{
            clone.push(cur)
        }
        return clone
    },[])
}