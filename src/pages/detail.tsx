import React from 'react';
import {Text, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "@/navigator/index";

//应为要调用this.props.route,所以需要定义接口route的类型
interface Iprops {
    route:RouteProp<RootStackParamList,'Detail'>
}

class Detail extends React.Component<Iprops>{
    render(){
        const {route}=this.props;

        return(
            <View>
                <Text>Detail</Text>
                <Text>{route.params.id}</Text>
            </View>
        )
    }
}
export default Detail