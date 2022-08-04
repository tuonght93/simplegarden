import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { actAddProductToOrder } from '../../actions/order';
import Header from '../../components/Header';
// import ItemProduct from '../../components/products/ItemProduct';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { formatNumber } from '../../services/Helper';

export default function Products({ navigation, route }) {

  const dispatch = useDispatch()

  const { product } = route.params;

  const insets = useSafeAreaInsets();

  const [promotion, setPromotion] = useState('');

  const [note, setNote] = useState('');

  const order = useSelector(state => state.order);

  const index = order.orders.findIndex(order => order.product.uuid === product.uuid);

  const [quantity, setQuantity] = useState(index !== -1 ? order.orders[index].quantity : 1);

  const onAddProductToOrder = () => {
    navigation.goBack()
    dispatch(actAddProductToOrder(product, quantity))
  }

  const toppings = [
    {
      poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/2bcd00f3b6e828020b37d10c634e30c9/8898_tytcN2_400x225.png',
      name: 'Đây là món mực xé ngon nhất Việt Nam',
      total_ordered: '999+',
      count_like: 120,
      price: '200,000',
      quantity: 99
    },
    {
      poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/a0ed7abe1427fea5a0d3f9794b47dddc/8841_tgRzOt_400x225.png',
      name: 'Đây là món mực xé ngon nhất Việt Nam',
      total_ordered: '999+',
      count_like: 120,
      price: '200,000',
      quantity: 0
    },
    {
      poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/f22f983abc98b6f6d4bc4f1b18178fb5/6206_TuzzZg_400x225.png',
      name: 'Trà tắc',
      total_ordered: '999+',
      count_like: 120,
      price: '200,000',
      quantity: 0
    },
    {
      poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/55ddc2480b90e16fd2f5a34d99961d79/458_ooPMEM_400x225.png',
      name: 'Trà mận',
      total_ordered: '999+',
      count_like: 120,
      price: '200,000',
      quantity: 0
    },
    {
      poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/f22f983abc98b6f6d4bc4f1b18178fb5/6206_TuzzZg_400x225.png',
      name: 'Hướng dương',
      total_ordered: '999+',
      count_like: 120,
      price: '200,000',
      quantity: 0
    },
    {
      poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/55ddc2480b90e16fd2f5a34d99961d79/458_ooPMEM_400x225.png',
      name: 'Trà vải',
      total_ordered: '999+',
      count_like: 120,
      price: '200,000',
      quantity: 1
    },
  ]

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={{ height: insets.top }} />
      <Header
        icon={require('../../assets/ic_close_black.png')}
        icBack={{ width: 16, height: 16 }}
        headerText={product.name}
        leftPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView>
        <ScrollView style={styles.content} contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 16 }}>
          <Image style={styles.image} source={{ uri: product.thumbnail }} />
          <View style={styles.boxDetail}>
            <Text style={styles.txtIngredient}>Số lượng</Text>
            <View style={styles.boxQuantity}>
              <TouchableOpacity onPress={() => setQuantity(quantity - 1)} disabled={quantity === 0}>
                <Image style={styles.icMinus} source={require('../../assets/ic_minus_gray.png')} />
              </TouchableOpacity>
              <Text style={styles.txtQuantity}>{quantity < 10 ? '0' + quantity : quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Image style={styles.icMinus} source={require('../../assets/ic_plus_circle.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.boxDetail}>
            <Text style={styles.txtIngredient}>Đơn giá</Text>
            <Text style={styles.txtPrice}>{formatNumber(product.price)}đ</Text>
          </View>
          {/* <View style={styles.boxDetail}>
                        <Text style={styles.txtIngredient}>Bán kèm</Text>
                    </View>
                    <View style={styles.boxListTopping}>
                        {
                            toppings.map((topping, index) => {
                                return <TouchableOpacity key={index} style={[styles.itemTopping, (index + 1) % 3 === 2 ? { width: '38%' } : { width: '28%' }]} onPress={() => null}>
                                    <Text style={styles.txtTopping} numberOfLines={1}>{topping.name} ({topping.quantity})</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                    <View style={styles.boxDetail}>
                        <Text style={styles.txtIngredient}>Mã giảm giá</Text>
                        <View style={styles.boxQuantity}>
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={promotion}
                                onChangeText={(promotion) => setPromotion(promotion)}
                                placeholder="Nhập từ khoá"
                                placeholderTextColor="#8A94A3"
                            />
                            <TouchableOpacity style={styles.btnPromotion}>
                                <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.boxDetail}>
                        <Text style={styles.txtIngredient}>Ghi chú</Text>
                    </View>
                    <TextInput
                        style={styles.ipNote}
                        selectionColor="#2A3B56"
                        value={note}
                        onChangeText={(note) => setNote(note)}
                        placeholder="Nhập nội dung"
                        placeholderTextColor="#8A94A3"
                        multiline
                    />
                    <View style={styles.boxDetail}>
                        <Text style={styles.txtIngredient}>Tổng tiền</Text>
                        <Text style={styles.txtPrice}>200,000đ</Text>
                    </View>
                    <View style={styles.boxDetail}>
                        <Text style={styles.txtListTopping}>Danh sách topping</Text>
                    </View>
                    <View style={styles.boxProduct}>
                        <View style={styles.boxListProduct}>
                            {
                                toppings.map((item, index) => {
                                    return <ItemProduct item={item} key={index} navigation={navigation} />
                                })
                            }
                        </View>
                    </View> */}
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={[styles.boxAction, { marginBottom: insets.bottom + 15 }]}>
        {/* <TouchableOpacity style={styles.btnLike}>
                    <Image style={styles.icLike} source={require('../../assets/ic_like_white.png')} />
                </TouchableOpacity> */}
        <TouchableOpacity style={[styles.btnOrder, { flex: 1 }]} onPress={onAddProductToOrder}>
          <Text style={styles.txtOrder}>{quantity === 0 ? 'Quay lại thực đơn' : 'Thêm vào giỏ hàng'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 18,
    borderRadius: 6,
    backgroundColor: '#bdbdbd',
  },
  boxDetail: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  txtIngredient: {
    color: '#2A3B56',
    fontSize: 14,
    fontWeight: 'bold'
  },
  boxQuantity: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icMinus: {
    width: 25,
    height: 25,
    marginLeft: 6
  },
  txtQuantity: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2A3B56'
  },
  txtPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F5AC02'
  },
  boxListTopping: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 3,
    justifyContent: 'space-between',
  },
  itemTopping: {
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FEDEA0',
  },
  txtTopping: {
    fontSize: 12,
    color: '#2A3B56'
  },
  ipContent: {
    width: 150,
    // height: 30,
    fontSize: 12,
    color: '#2A3B56',
    borderRadius: 6,
    backgroundColor: '#F6F4F4',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  btnPromotion: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  icNext: {
    width: 5,
    height: 11
  },
  ipNote: {
    height: 90,
    textAlignVertical: 'top',
    borderRadius: 6,
    backgroundColor: '#F6F4F4',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 20
  },
  txtListTopping: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A3B56'
  },
  boxAction: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  btnLike: {
    flex: 0.25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#FEDEA0',
  },
  icLike: {
    width: 23,
    height: 20
  },
  btnOrder: {
    flex: 0.7,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#1B4731',
  },
  txtOrder: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
})