
import { Spin } from 'antd';
import { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import RenderRouter from './router';
import '@/styles/index.less'

const App = () => {
  return (
    <Suspense fallback={<Spin></Spin>}>
      <HashRouter>
        <RenderRouter></RenderRouter>
      </HashRouter>
    </Suspense>
  )
} 
export default App;
