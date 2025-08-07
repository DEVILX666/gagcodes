'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Pet {
  id: number
  name: string
  subtitle: string
  image: string
  overlayImage: string
  code: string
  usedToday: number
  codesLeft: number
  rating: number
}

const petsData: Pet[] = [
  {
    id: 1,
    name: "Kitsune",
    subtitle: "Mystical Fox Pet",
    image: "/images/Kitsune.webp",
    overlayImage: "/images/Kitsune.webp",
    code: "KITSUNE2025",
    usedToday: 58,
    codesLeft: 161,
    rating: 4.8
  },
  {
    id: 2,
    name: "Corrupted Kitsune",
    subtitle: "Dark Fox Pet",
    image: "/images/CorruptedKitsune.webp",
    overlayImage: "/images/CorruptedKitsune.webp",
    code: "CORRUPTED2025",
    usedToday: 42,
    codesLeft: 89,
    rating: 4.9
  },
  {
    id: 3,
    name: "Queen Bee",
    subtitle: "Royal Bee Pet",
    image: "/images/Queen_bee.webp",
    overlayImage: "/images/Queen_bee.webp",
    code: "QUEENBEE2025",
    usedToday: 73,
    codesLeft: 127,
    rating: 4.7
  },
  {
    id: 4,
    name: "T-Rex",
    subtitle: "Dinosaur Pet",
    image: "/images/T-Rex.webp",
    overlayImage: "/images/T-Rex.webp",
    code: "TREX2025",
    usedToday: 91,
    codesLeft: 209,
    rating: 4.6
  },
  {
    id: 5,
    name: "Dragonfly",
    subtitle: "Flying Insect Pet",
    image: "/images/DragonflyIcon.webp",
    overlayImage: "/images/DragonflyIcon.webp",
    code: "DRAGONFLY2025",
    usedToday: 34,
    codesLeft: 156,
    rating: 4.8
  },
  {
    id: 6,
    name: "Raccoon",
    subtitle: "Masked Bandit Pet",
    image: "/images/Raccon_Better_Quality.webp",
    overlayImage: "/images/Raccon_Better_Quality.webp",
    code: "RACCOON2025",
    usedToday: 67,
    codesLeft: 143,
    rating: 4.5
  },
  {
    id: 7,
    name: "Mimic Octopus",
    subtitle: "Shape-shifting Pet",
    image: "/images/MimicOctopusIcon.webp",
    overlayImage: "/images/MimicOctopusIcon.webp",
    code: "MIMIC2025",
    usedToday: 29,
    codesLeft: 78,
    rating: 4.9
  },
  {
    id: 8,
    name: "Fennec Fox",
    subtitle: "Desert Fox Pet",
    image: "/images/FennecFoxIcon.webp",
    overlayImage: "/images/FennecFoxIcon.webp",
    code: "FENNEC2025",
    usedToday: 45,
    codesLeft: 112,
    rating: 4.7
  },
  {
    id: 9,
    name: "Spinosaurus",
    subtitle: "Aquatic Dino Pet",
    image: "/images/Spinosaurus.webp",
    overlayImage: "/images/Spinosaurus.webp",
    code: "SPINO2025",
    usedToday: 38,
    codesLeft: 95,
    rating: 4.8
  },
  {
    id: 10,
    name: "Blood Owl",
    subtitle: "Night Hunter Pet",
    image: "/images/Blood_Owl_Icon.webp",
    overlayImage: "/images/Blood_Owl_Icon.webp",
    code: "BLOODOWL2025",
    usedToday: 52,
    codesLeft: 134,
    rating: 4.6
  },
  {
    id: 11,
    name: "Chicken Zombie",
    subtitle: "Undead Pet",
    image: "/images/Chicken_Zombie_Icon.webp",
    overlayImage: "/images/Chicken_Zombie_Icon.webp",
    code: "ZOMBIE2025",
    usedToday: 41,
    codesLeft: 87,
    rating: 4.4
  },
  {
    id: 12,
    name: "Cooked Owl",
    subtitle: "Culinary Pet",
    image: "/images/Cooked_Owl.webp",
    overlayImage: "/images/Cooked_Owl.webp",
    code: "COOKED2025",
    usedToday: 23,
    codesLeft: 56,
    rating: 4.3
  },
  {
    id: 13,
    name: "Disco Bee",
    subtitle: "Party Bee Pet",
    image: "/images/DiscoBeeIcon.webp",
    overlayImage: "/images/DiscoBeeIcon.webp",
    code: "DISCO2025",
    usedToday: 31,
    codesLeft: 73,
    rating: 4.5
  },
  {
    id: 14,
    name: "Red Fox",
    subtitle: "Fire Fox Pet",
    image: "/images/RedFox.webp",
    overlayImage: "/images/RedFox.webp",
    code: "REDFOX2025",
    usedToday: 48,
    codesLeft: 118,
    rating: 4.7
  },
  {
    id: 15,
    name: "Butterfly",
    subtitle: "Graceful Pet",
    image: "/images/Thy_Butterfly_V2.webp",
    overlayImage: "/images/Thy_Butterfly_V2.webp",
    code: "BUTTERFLY2025",
    usedToday: 36,
    codesLeft: 92,
    rating: 4.6
  }
]

const loadingSteps = [
  { message: "Checking amount of coupons left...", duration: 1000, progress: 25 },
  { message: "Checking coupon code validity...", duration: 1200, progress: 50 },
  { message: "Coupon is valid!", duration: 2000, progress: 99 }
]

// Easing function for smooth animations
const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3)
}

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPet, setCurrentPet] = useState<Pet | null>(null)
  const [modalState, setModalState] = useState<'initial' | 'loading' | 'ready'>('initial')
  const [currentProgress, setCurrentProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [filteredPets, setFilteredPets] = useState<Pet[]>(petsData)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Search functionality with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      const filtered = petsData.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPets(filtered)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm])

  // Dynamic number updates
  useEffect(() => {
    const updateNumbers = () => {
      const dynamicNumbers = document.querySelectorAll('.dynamic-number')
      dynamicNumbers.forEach((element) => {
        const type = element.getAttribute('data-type')
        if (type === 'used-today') {
          const currentValue = parseInt(element.textContent || '0')
          const newValue = currentValue + Math.floor(Math.random() * 5) + 1
          element.textContent = newValue.toString()
          element.classList.add('number-changed')
          setTimeout(() => element.classList.remove('number-changed'), 600)
        } else if (type === 'codes-left') {
          const currentValue = parseInt(element.textContent || '0')
          const newValue = Math.max(0, currentValue - Math.floor(Math.random() * 3) - 1)
          element.textContent = newValue.toString()
          element.classList.add('number-changed')
          setTimeout(() => element.classList.remove('number-changed'), 600)
        }
      })
    }

    const interval = setInterval(updateNumbers, 10000)
    return () => clearInterval(interval)
  }, [])

  const openPetModal = (pet: Pet) => {
    setCurrentPet(pet)
    setIsModalOpen(true)
    setModalState('initial')
    setCurrentProgress(0)
    setCurrentStep(0)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentPet(null)
    setModalState('initial')
  }

  const showCode = async () => {
    if (!currentPet) return

    setModalState('loading')
    setCurrentProgress(0)
    setCurrentStep(0)

    for (let i = 0; i < loadingSteps.length; i++) {
      const step = loadingSteps[i]
      setCurrentStep(i)
      
      // Animate progress with easing function for smoother animation
      const startProgress = i === 0 ? 0 : loadingSteps[i - 1].progress
      const targetProgress = step.progress
      const frames = 30 // More frames for smoother animation
      
      for (let j = 0; j <= frames; j++) {
        await new Promise(resolve => setTimeout(resolve, step.duration / frames))
        // Use cubic easing for smoother animation
        const progress = startProgress + (targetProgress - startProgress) * easeOutCubic(j / frames)
        setCurrentProgress(progress)
      }
      
      // Add a small pause at each step completion
      if (i < loadingSteps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    }
    
    // Add a final step from 99% to 100% with a longer pause
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Animate from 99% to 100%
    const finalFrames = 20
    for (let j = 0; j <= finalFrames; j++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      const progress = 99 + (1 * easeOutCubic(j / finalFrames))
      setCurrentProgress(progress)
    }
  
    // Add a longer pause at 100% before showing the ready state
    await new Promise(resolve => setTimeout(resolve, 1000))
    setModalState('ready')
  }

  const redirectToFullCode = () => {
    window.open('https://installchecker.site/cl/i/37ek8n', '_blank')
  }

  const getHalfRevealedCode = (code: string) => {
    const halfLength = Math.ceil(code.length / 2)
    return '•'.repeat(code.length - halfLength) + code.slice(-halfLength)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Image 
                src="/images/logo2.webp" 
                alt="Grow a Garden Pet Codes Logo" 
                width={40} 
                height={40} 
                className="logo-image"
              />
              <h1>Grow a Garden Pet Codes</h1>
            </div>
            <div className="header-actions">
              <button 
                className="theme-toggle" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <i className="fas fa-sun" id="sunIcon"></i>
                <i className="fas fa-moon" id="moonIcon"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search pets (Kitsune, Dragon, Fox...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="pets-grid">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="pet-card" onClick={() => openPetModal(pet)}>
                <div className="pet-image-section">
                  <div className="pet-main-image">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="pet-overlay-image">
                    <Image
                      src={pet.overlayImage}
                      alt={pet.name}
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  </div>
                  <div className="pet-rating">
                    <i className="fas fa-star"></i>
                    <span>{pet.rating}</span>
                  </div>
                </div>
                
                <div className="pet-content">
                  <div className="pet-title">{pet.name}</div>
                  <div className="pet-subtitle">{pet.subtitle}</div>
                  
                  <div className="code-section">
                    <div className="code-type">
                      <i className="fas fa-ticket-alt"></i>
                      <span>Free Pet Code</span>
                    </div>
                    <div className="coupons-left">
                      <i className="fas fa-users"></i>
                      <span className="dynamic-number" data-type="codes-left">{pet.codesLeft}</span> coupons left
                    </div>
                  </div>
                  
                  <button className="btn-get-code">
                    <i className="fas fa-gift"></i>
                    Get Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && currentPet && (
        <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
          <div className="modal">
            <div className="modal-header">
              <div className="header-content">
                <div className="pet-info">
                  <div className="pet-icon">
                    <Image
                      src={currentPet.image}
                      alt={currentPet.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="pet-details">
                    <div className="pet-subtitle">{currentPet.subtitle}</div>
                    <div className="pet-title">{currentPet.name}</div>
                  </div>
                </div>
                <button className="modal-close" onClick={closeModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="status-badges">
                <div className="badge">
                  <i className="fas fa-ticket-alt"></i>
                  <span className="dynamic-number" data-type="codes-left">{currentPet.codesLeft}</span> coupons left
                </div>
                <div className="badge">
                  <i className="fas fa-check"></i>
                  Verified
                </div>
              </div>
            </div>
            
            <div className="modal-content">
              {/* Game Code Banner */}
              <div className="game-code-banner">
                <div className="banner-content">
                  <h3>Game Code</h3>
                  <p>{currentPet.name} Free Pet Code</p>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="stats-section">
                <div className="stat-item">
                  <i className="fas fa-star"></i>
                  <div className="stat-number">4.8</div>
                  <div className="stat-label">1096 Ratings</div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <div className="stat-number dynamic-number" data-type="used-today">{currentPet.usedToday}</div>
                  <div className="stat-label">Used today</div>
                </div>
              </div>

              {/* Code Display Section */}
              <div className="code-display-section">
                {modalState === 'initial' && (
                  <div className="code-display">
                    <div className="professional-button" onClick={showCode}>
                      <div className="button-left">
                        <span>Show Coupon Code</span>
                      </div>
                      <div className="button-right">
                        <span className="blurry-code">{getHalfRevealedCode(currentPet.code)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {modalState === 'loading' && (
                  <div className="loading-container">
                    <div className="progress-circle">
                      <svg className="progress-ring" width="120" height="120">
                        <circle 
                          className="progress-ring-bg" 
                          stroke="#e5e7eb" 
                          strokeWidth="8" 
                          fill="transparent" 
                          r="52" 
                          cx="60" 
                          cy="60"
                        />
                        <circle 
                          className={`progress-ring-circle ${currentProgress >= 100 ? 'completed' : ''}`}
                          stroke="#10b981" 
                          strokeWidth="8" 
                          fill="transparent" 
                          r="52" 
                          cx="60" 
                          cy="60"
                          style={{
                            strokeDasharray: 326.726,
                            strokeDashoffset: 326.726 - (326.726 * currentProgress / 100)
                          }}
                        />
                        {/* Celebration particles that appear when progress reaches 100% */}
                        {currentProgress >= 100 && (
                          <>
                            <circle className="celebration-particle particle-1" cx="60" cy="8" r="3" fill="#10b981" />
                            <circle className="celebration-particle particle-2" cx="100" cy="30" r="4" fill="#059669" />
                            <circle className="celebration-particle particle-3" cx="112" cy="60" r="3" fill="#10b981" />
                            <circle className="celebration-particle particle-4" cx="100" cy="90" r="5" fill="#059669" />
                            <circle className="celebration-particle particle-5" cx="60" cy="112" r="3" fill="#10b981" />
                            <circle className="celebration-particle particle-6" cx="20" cy="90" r="4" fill="#059669" />
                            <circle className="celebration-particle particle-7" cx="8" cy="60" r="3" fill="#10b981" />
                            <circle className="celebration-particle particle-8" cx="20" cy="30" r="5" fill="#059669" />
                          </>
                        )}
                      </svg>
                      <div className={`progress-text ${currentProgress >= 100 ? 'completed' : ''}`}>
                        {Math.round(currentProgress)}%
                      </div>
                    </div>
                    <div className="loading-message">
                      {loadingSteps[currentStep]?.message || "Processing..."}
                    </div>
                  </div>
                )}

                {modalState === 'ready' && (
                  <div className="coupon-ready">
                    <h3>Your Coupon Code is Ready!</h3>
                    
                    <div className="coupon-code-box">
                      <div className="coupon-code-content">
                        <span className="coupon-label">COUPON CODE</span>
                        <div className="coupon-status">
                          <i className="fas fa-lock"></i>
                          <span>LOCKED</span>
                        </div>
                      </div>
                      <div className="coupon-code-preview blurry-code">
                        {getHalfRevealedCode(currentPet.code)}
                      </div>
                    </div>
                    
                    <div data-captcha-enable="true"></div>
                    
                    <button className="btn-get-full-code" onClick={redirectToFullCode}>
                      Get Full Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
