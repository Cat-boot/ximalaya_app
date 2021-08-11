import React from 'react';
import { Text, View} from "react-native";

//定义this.props属性的类型，一般没什么特别用处，就用接口interface类型定义，没必要使用类型别名
class Found extends React.Component{
    render(){
        return(
            <View>
                <Text>Found</Text>
            </View>
        )
    }
}
export default Found