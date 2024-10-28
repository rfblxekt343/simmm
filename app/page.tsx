import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import dynamic from 'next/dynamic'


const PopularPackages = dynamic(() => import('../components/PopularPackages'), { 
  ssr: false,
  loading: () => <div>Loading Popular Packages...</div>
})
const BlogPosts = dynamic(() => import('../components/BlogPosts'), { 
  ssr: false,
  loading: () => <div>Loading Blog Posts...</div>
})
const ProviderLogos = dynamic(() => import('../components/ProviderLogos'), { 
  ssr: false,
  loading: () => <div>Loading Provider Logos...</div>
})

export default function Home() {
  // You can use COMPANY_NAME here if needed, e.g., for page title
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-5">
        <PopularPackages />
        <ProviderLogos />
        <BlogPosts />
      </main>
      <Footer />
    </div>
  )
}
