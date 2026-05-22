import { render, screen } from '@testing-library/react'
import App from '../App'
import LoginPage from '../components/Login/LoginPage'

test('renders app', () => {//اسم الفانكسن تبع التيست
  render(<LoginPage />)//شغلي الكومبوننت هي 
  //هلق محتويات الكومبوننت كلياتها صارت محطوطة بقلب السكرين الزرقة يلي تحت 
  // فانت شو بدك تتست منها بتحطو بمتغير وبتستو
  const item =screen.getByText(/الاسم/i)
  // getByText هي بتجيب النص يلي عالشاشة
  expect(item.toBeInTheDocument())//موجود عالشاشة
})