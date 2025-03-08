// An array of Tarot card objects, each containing the card's name, its meaning, a personalized reading, and the path to its image.
const tarotMeanings = [
    {
        name: "The Fool",
        meaning: "This card represents important decisions, new beginnings, optimism and carefreedom.",
        reading: "Today, take a leap of faith and step into the unknown with a heart full of trust. Trust the journey you're about to face and don't let fear hold your back. The possibilities are limitless, so experience life without overthinking every step. You may not have all the answer to all questions, but it doesn't matter. You'll be rewarded for your courageous efforts. This is the time to explore, to experiment, and embrace spontaneity.",
        image: "/src/scenes/tarot/Deck/major_arcana_fool.png"
    },
    {
        name: "The Magician",
        meaning: "This card represents confidence, creativeness, proficiency and skilfulness.",
        reading: "Today your potential and power are limitless. Harness your skills, trust in your abilities, and focus your energy on turning things in reality instead of waiting any longer. You have all the tools to overcome any obstacle – with focus and determination, you’ll achieve your goals. Be wary of the possibility of being manipulated or feeling overconfident – don’t rely on trick or shortcuts. However, today’s the day to create and go forward in life.",
        image: "/src/scenes/tarot/Deck/major_arcana_magician.png"
    },
    {
        name: "The High Priestess",
        meaning: "This card represents insight, understanding, wisdom and mystery.",
        reading: "Today, listen closely to the whispers of your inner voice be your compass. There's more beneath the surface than meets the eye, so secrets may be revealed only if you allow your intuition guide you. Embrace the silence and remain patient. When making decisions, take a pause and observe rather than rush into things. Surrender to the flow of life and allow things to unfold naturally – what's meant for you will unfold when the time is right.",
        image: "/src/scenes/tarot/Deck/major_arcana_priestess.png"
    },
    {
        name: "The Empress",
        meaning: "This card represents productivity, fulfilment, creativity and feminine influence.",
        reading: "Today, surround yourself with what nurtures your soul and serves you positively. Whether it’s indulging in self-care, or caring for others, allow yourself to revel in abundance that flows around you. The seeds you’ve planted in the past are starting to come to fruition, so it’s time to take a break. Remember not to overextend yourself and take time to rejuvenate. Cultivate your peace within in order to make your outer world to thrive.",
        image: "/src/scenes/tarot/Deck/major_arcana_empress.png"
    },
    {
        name: "The Emperor",
        meaning: "This card represents rationality, stability, authority and masculine influence.",
        reading: "Today, focus on leadership and integrity, and trust in your ability to create stability for your future. It’s time to charge of your situation and lead with confidence. Make decisive moves and stand strong behind your choices. Discipline, clear boundaries and sense of responsibility will guide you through challenges. Remember that leadership doesn’t have to be domineering – instead, maintain flexibility, compassion and respect for others.",
        image: "/src/scenes/tarot/Deck/major_arcana_emperor.png"
    },
    {
        name: "Strength",
        meaning: "This card represents strength, willpower, vitality and facing challenges.",
        reading: "Today, embrace your inner strength and charge forward with confidence. You have more courage than you’re willing to admit – you also have the ability to endure and rise above any challenge with grace and deeper understanding. True strength comes from a place of softness and vulnerability, and the ability to tame fear and doubts. Approach situations with calmness and confidence and don’t underestimate your resilience.",
        image: "/src/scenes/tarot/Deck/major_arcana_strength.png"
    },
    {
        name: "The Hermit",
        meaning: "This card represents solitude, introspection, guidance and detachment.",
        reading: "Today calls for solitude and introspection. Take a step back and give yourself the space that you’ve needed for some time to finally recharge. Don’t be afraid to spend time alone – clarity and wisdom come to those who appreciate the quiet moments and stillness. Listen to your inner voice, because the answer that you’re looking for are within you. Explore your inner thoughts through meditation, journaling or spending time in nature.",
        image: "/src/scenes/tarot/Deck/major_arcana_hermit.png"
    },
    {
        name: "Wheel of Fortune",
        meaning: "This card represents change, destiny, good luck and cycles of life.",
        reading: "Today, things seem to be in motion and change is on the horizon. Trust that everything is part of a bigger picture, whether it’s a positive turn or a challenging moment, and the winds of change are leading you toward personal grown and brighter future. Change is inevitable and any type of shift will bring a lesson to learn from. Stay open-minded and adaptable – accept the flow of life and trust that you’re on the right direction.",
        image: "/src/scenes/tarot/Deck/major_arcana_fortune.png"
    },
    {
        name: "Justice",
        meaning: "This card represents balance, fairness, equality and justice.",
        reading: "Today, balance and fairness both are at the forefront. Examine your decisions, actions, and the possible consequences they might bring. Be honest with yourself and people around you and remain fair when a situation requires fairness. Know that what you give out will come back to you, so make sure that whatever you do is in alignment with your values.",
        image: "/src/scenes/tarot/Deck/major_arcana_justice.png"
    },
    {
        name: "The Hanged Man",
        meaning: "This card represents discontinuation, transition, suspension and restriction.",
        reading: "This is your sign to let you know that you need to step back and surrender to the situation. This is a perfect moment to pause and reflect before rushing into action. Releasing the need for control will bring much needed clarity. You will gain the insight needed to move forward with renewed purpose. Whatever is bothering you now shall pass, and the answers that you're looking for, will come when you're ready to receive them.",
        image: "/src/scenes/tarot/Deck/major_arcana_hanged.png"
    },
    {
        name: "Death",
        meaning: "This card represents the end, changes, loss and new beginnings.",
        reading: "Today, you’re faced with something in your life that is coming to an end – this is simply the beginning of something new rather than a literal death. It’s time to release what no longer serves your highest good. Embrace change with open heart and be ready for something even more meaningful and in harmony with who you are. This is a moment for renewal and personal growth, rather than destruction of something.",
        image: "/src/scenes/tarot/Deck/major_arcana_death.png"
    },
    {
        name: "Temperance",
        meaning: "This card represents control, balance, capability and moderation.",
        reading: "Today, balance and harmony are your guiding principles. Be patient and avoid extremes, but instead, focus on moderation and steady progress, allowing things to unfold naturally and gradually. Take a step back and evaluate where you can bring balance as well – rushing into things may lead to imbalance. Today's the day to nurture your inner peace, be mindful of your energy and find calmness in any adjustments you make.",
        image: "/src/scenes/tarot/Deck/major_arcana_temperance.png"
    },
    {
        name: "The Devil",
        meaning: "This card represents the gain of control, addiction, restriction, jealousy or resentment.",
        reading: "Today, you may be faced with the temptation to stay in a situation that isn't healthy for you. Take a hard look at what might be holding you back, whether it's a toxic pattern or a mindset that keeps you stuck - don't judge yourself, but instead, recognize what's limiting your freedom and happiness. You alone hold the power to free yourself from whatever feels confining and controlling.",
        image: "/src/scenes/tarot/Deck/major_arcana_devil.png"
    },
    {
        name: "The Tower",
        meaning: "This card represents destruction, unexpected events, loss and ruin, and new beginnings.",
        reading: "Today, be ready for a shake-up. You will face an unexpected event or revelation that challenges the very foundation you've built. This sudden change may feel destabilizing and uncomfortable at first, but it's important to remember that it's clearing away the old to make room for the new - it's a necessary process for personal growth. Embrace the chaos and know whatever you build, will be stronger than ever before.",
        image: "/src/scenes/tarot/Deck/major_arcana_tower.png"
    },
    {
        name: "The Star",
        meaning: "This card represents hope, renewal, serenity and new opportunities.",
        reading: "Today, hope is your guiding light. The darkness that has followed you for a while is gone now and finally, a brighter chapter lies ahead. Believe in the endless possibilities and let your inner peace shine through. Take this moment to dream big, have faith that what you desire is on its way and allow yourself to heal and nourish your spirit. Don't worry about anything for now, the universe has a plan for you.",
        image: "/src/scenes/tarot/Deck/major_arcana_star.png"
    },
    {
        name: "The Moon",
        meaning: "This card represents caution, confusion, delusion and risks.",
        reading: "Today, things may not be as they seem, and you may find yourself navigating through confusion and uncertainty. Trust your intuition but be cautious of illusions or hidden truths. Today's the day to reflect and examine your conscious thoughts and emotions. Remember to stay patient and don't rush to make decisions until you have full clarity - trust that the truth will reveal itself in due time.",
        image: "/src/scenes/tarot/Deck/major_arcana_moon.png"
    },
    {
        name: "The Sun",
        meaning: "This card represents joy, success, achievements and abundance.",
        reading: "Today, you're being bathed in light, positivity and joy. The world is aligned in your favour, and everything seems to be full of possibilities. This is a time of happiness, success, confidence and clarity. Whatever challenges you've faced, you're now stepping into a phrase of abundance. Celebrate your achievements, trust in your abilities, and let your radiant energy shine bright for all to see while continuing forward with optimism.",
        image: "/src/scenes/tarot/Deck/major_arcana_sun.png"
    },
    {
        name: "Judgement",
        meaning: "This card represents change, decisions, transformation and success.",
        reading: "Today, reflect on your past actions and choices, and be honest with yourself. Release the old patterns that no longer serve you and give yourself the grace to start fresh. A new chapter begins when you forgive yourself and those who have wronged you and move on. Trust that you're ready to make the necessary changes for a new phase of life - and finally, to become a person you've always wanted to be.",
        image: "/src/scenes/tarot/Deck/major_arcana_judgement.png"
    },
    {
        name: "The World",
        meaning: "This card represents certainty, completion, satisfaction and reward.",
        reading: "Today, you're being brought a sense of completion and fulfilment. You've just ended a journey where you've learnt and grown - everything has come together in a balanced way. Reflect on how far you have come and celebrate all the achievement you've made so far. Take a deep breath and pause for a moment, but don't stop here. Proudly step forward into the next chapter with new confidence and expand your horizons.",
        image: "/src/scenes/tarot/Deck/major_arcana_world.png"
    },
    {
        name: "Ace of Wands",
        meaning: "This card represents creativity, new beginnings, commencement and inventiveness.",
        reading: "Today, excitement and inspiration are on the horizon. Today’s the day for new beginnings and bold actions – now is the time to act. A surge of creative energy entering your life, fuelling your passions and creative pursuits. Channel your energy into something you’re passionate about and break free from hesitation. Embrace the spark and trust your instincts – the world is ready for your fire.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_ace.png"
    },
    {
        name: "Two of Wands",
        meaning: "This card represents achievements, anxiety, goals, and partnerships.",
        reading: "Today, you’re standing at the edge of new possibilities, and you may be considering long-term plans. Look toward the future with curiosity and ambition, weigh your options and potential outcomes of your next move – evaluate where you want to go. You have the power to shape your future and it’s fully up to you to take that first step. Be brave enough to move toward the new adventure with confidence.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_2.png"
    },
    {
        name: "Three of Wands",
        meaning: "This card represents achievements, long-term success, new beginnings and partnerships.",
        reading: "Today, you are able to see that your efforts are starting to pay off. It is time to enjoy the anticipation of your expansion and progress – however, you’re not quite at the finish line yet, but you’re heading in the right direction. Trust that bigger opportunities and greater achievements are just around the corner for those who stay focused and keep building upon momentum. Trust the process.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_3.png"
    },
    {
        name: "Four of Wands",
        meaning: "This card represents celebration, completion, new beginnings and pleasure.",
        reading: "Today celebration, fulfilment, balance and stability are present. Appreciate the fruits of your labour whether it’s a small victory of a major milestone. Enjoy the balance that the present moment provides and celebrate the stability you’ve worked hard to build. Remember to take time to think about your next expansion – keep building on this strong foundation and your future will be bright.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_4.png"
    },
    {
        name: "Five of Wands",
        meaning: "This card represents anxiety, conflicts, disagreements and struggles.",
        reading: "Today tension, completion or conflict may arise. You may face challenges or disagreements, either internally or with people around you – and, you may be feeling pulled in different directions. These challenges will test your resilience, so keep your cool and stay focused on your goals. Healthy rivalry can lead to personal growth, but don’t get caught up in drama. Seek compromise whenever possible.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_5.png"
    },
    {
        name: "Six of Wands",
        meaning: "This card represents completion, good news, success and recognition.",
        reading: "Today, victory is at hand. You’ve either overcome a certain obstacle or achieved something significant, so now it’s time to take pride in your accomplishments. Your success positively impacts those around you. People admire your determination – you may even find yourself in the spotlight for a moment, so don’t let the recognition go to your head. Continue striving for more while remaining humble and grateful.",
        image: "/src/scenes/tarot/Deck//minor_arcana_wands_6.png"
    },
    {
        name: "Seven of Wands",
        meaning: "This card represents perseverance, courage, strength and resistance.",
        reading: "Today perseverance is required. You may be in a position where you need to stand firm, be assertive and defend your beliefs, actions, or decisions. Challenges are present, but you have the strength to rise above them – know which battles are worth the attention and which are better left ignored. You’ll come out stronger on the other side if you stay grounded in your convictions and trust your ability to navigate the pressure.",
        image: "/src/scenes/tarot/Deck//minor_arcana_wands_7.png"
    },
    {
        name: "Eight of Wands",
        meaning: "This card represents hasty actions, motion, journey and end to a delay.",
        reading: "Today, things are moving in a fast pace. Focus on what you can control and not get overwhelmed by the speed of things. Keep your intentions clear and organized and expect to make swift decisions. After all, this is a positive surge than may lead you to exciting developments if you decide to seize the opportunities. Try to remember to remain adaptable and agile – make the most of the momentum.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_8.png"
    },
    {
        name: "Nine of Wands",
        meaning: "This card represents inner strength, cautious, anxiety and impermanent security.",
        reading: "Today, exhaustion may be setting in after the long journey. You’re almost there, near the finish line, so keep pushing forward with determination. – your resilience is your greatest asset. You may feel doubts and fears running through your head, but you’re more capable than you think. Stay alert and ready for anything that may come your way. You have been through challenges before, so know that your perseverance will soon pay off.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_9.png"
    },
    {
        name: "Ten of Wands",
        meaning: "This card represents burdens, challenges, pressure and overcommitment.",
        reading: "Today, you may feel weighed down by the demands of life, whether it’s a burden or responsibility. You may be struggling to balance different aspects of your life and the effort required is draining you. While it’s important to keep moving, don’t forget to ask for help from others when needed – delegate what’s too heavy to carry alone or release what’s no longer serving you in a positive way. You’ll soon find relief and a chance to rest.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_10.png"
    },
    {
        name: "Page of Wands",
        meaning: "This card represents new beginnings, ambition, adventure and energy.",
        reading: "Today excitement, curiosity and creative energy are your guiding stars. You may feel inspired by something new – whether it’s a project, a travel opportunity, or a fresh approach to a current situation. New ideas are coming your way, and you’re filled with enthusiasm and passion. Embrace the new opportunities with optimism and open heart. Nurture the sparks of inspiration and trust in your potential to create and explore.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_page.png"
    },
    {
        name: "Knight of Wands",
        meaning: "This card represents determination, unpredictability, leading and challenges.",
        reading: "Today is about bold actions and adventure. Follow your passions with full force: fearlessly, confidently and enthusiastically – don’t be afraid to take risks, but also be mindful of possible burnout. Stay focused on your end goal and avoid hasty decisions or reckless behaviour of impulsiveness. Embrace the unknown and shake things up. The dreams you chase will become a reality of you maintain a sense of balance.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_knight.png"
    },
    {
        name: "Queen of Wands",
        meaning: "This card represents honesty, positive energy, hard work and thoughtfulness.",
        reading: "Today confidence and positive energy surround you. Let your inner strength, assertiveness and charisma shine brightly in all that you do. Let your creativity and intuition guide your actions. Right now, achieving your goal is not the most important thing, but instead, enjoying the process. Your positive energy is contagious – inspire people around you with your charisma and enthusiasm and light the way for others.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_queen.png"
    },
    {
        name: "King of Wands",
        meaning: "This card represents authority figure, financial success, trustworthiness and mediation.",
        reading: "Today, step into a position of authority and take control of a certain situation with confidence and clarity. You embody the energy of a visionary who has a clear sense of purpose and is willing to take calculated risks. Harness your inner power and use it to guide others. Remember to maintain a balance between confidence and humility. Pursue your goals with unwavering determination – the time is now to make things happen.",
        image: "/src/scenes/tarot/Deck/minor_arcana_wands_king.png"
    },
    {
        name: "Ace of Cups",
        meaning: "This card represents abundance, satisfaction, success and intense relationships.",
        reading: "Today, a new wave of emotional fulfilment is on the horizon – whether it’s an emotional renewal, love, or new beginnings. You’ll receive an opportunity to open your heart to the potential for a deep connection with someone. You may also find that love, support, or inspiration that you’ve been looking for. Trust what is coming into your life will nourish and enrich you. Let this energy guide you toward a meaningful sense of connection.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_ace.png"
    },
    {
        name: "Two of Cups",
        meaning: "This card represents commitment, friendship, partnership and love.",
        reading: "Today’s the day of unity and partnership – whether it’s a romantic connection or a friendship. You ‘ll be surrounded by love or any meaningful bond that will bring you a sense of balance and fulfilment. Deepen your emotional connections with people you care about – nurture your connections with appreciation and care. Remember that you will achieve greater things together with someone with shared values and mutual respect.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_2.png"
    },
    {
        name: "Three of Cups",
        meaning: "This card represents abundance, celebration, gathering and entertainment.",
        reading: "Today, celebrate those who lift you up and share the happiness with one another. Today is about coming together celebrating both individual and collective achievements. Let the positive energy fill you up and spend quality time with your inner circle, because happiness is amplified when shared. Appreciate the bonds, support and harmony that you have within a group – the power of togetherness will make life sweeter.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_3.png"
    },
    {
        name: "Four of Cups",
        meaning: "This card represents disappointment, dissatisfaction, re-evaluation and boredom.",
        reading: "Today, take a moment to reflect on what truly brings you peace. You may be feeling disconnected or even dissatisfied with an aspect of your life that once brought you joy. You’ll be unable to see the opportunities or available to you, if you focus too much on what’s lacking in your life. Open your eyes and try to move past the sense of stagnation, as there might be something beautiful right in front of you that you’re overlooking.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_4.png"
    },
    {
        name: "Five of Cups",
        meaning: "This card represents avoidance, detachment, loss and new hope.",
        reading: "Today grief may weigh heavy on your shoulders, but don’t let it cloud your vision. Instead of focusing on disappointments or what you’ve lost, recognize the opportunities that still lie ahead. There is hope and not all is lost – focus on opening yourself up to what still remains, whether it’s within yourself or in the world around you. Allow yourself to grieve but also find the strength to move forward – don’t let emotions consume you.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_5.png"
    },
    {
        name: "Six of Cups",
        meaning: "This card represents past associations, reconciliation, reminiscent and return.",
        reading: "Today, a sense of nostalgia is calling. You may find comfort in reflecting fond memories, reconnecting with old friends, or revisiting a long-forgotten passion that brought you joy. Let the simplicity of earlier times remind you of the joy in life’s little moments. You need to heal old wounds and bring closure to past situations – address them with compassion. Cherish the past while enhancing your present and future experiences.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_6.png"
    },
    {
        name: "Seven of Cups",
        meaning: "This card represents confusion, decisions, temptations and speculations.",
        reading: "Today, you’ll be faced with choices and potential distractions. It’s important to make clear decisions rather than chasing unrealistic expectations. It’s easy to get caught in excitement of multiple opportunities, but it’s more important to take a deep breath and choose what aligns with your heart, values and goals. Trust your intuition and avoid getting lost in illusions, and by doing so, you’ll make choices that bring real, long-term satisfaction.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_7.png"
    },
    {
        name: "Eight of Cups",
        meaning: "This card represents abandonment, personal development, departure and changes in life.",
        reading: "Today, make sure to walk away from something that no longer serves your higher good – whether it’s a certain situation, relationship or phase of life that now feels unfulfilling. Although the departure may feel uncertain or even painful, trust that it’s necessary for growth. Personal growth often requires leaving the comfort zone and stepping into the unknown. Take time to reflect on what’s missing and what you truly desire.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_8.png"
    },
    {
        name: "Nine of Cups",
        meaning: "This card represents completion, fulfilment, satisfaction and pleasure.",
        reading: "Today, contentment is within your reach today. You’re entering a phase of emotional abundance and now it’s time to enjoy the fruits of labour. Your emotional needs are being met and finally, you’re able to feel at peace with yourself and your life. Appreciate the good things around you and understand that happiness can be found within. Enjoy your successes, but also consider, how you can nurture this sense of fulfilment in the future.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_9.png"
    },
    {
        name: "Ten of Cups",
        meaning: "This card represents abundance, achievements, happiness and family.",
        reading: "Today is a day of happiness, harmony and connection. Everything in your personal life align perfectly and you may feel deep emotional satisfaction. Family, friendships and love are shining brightly – you’re surrounded by a sense of unity and positive energy. Today’s the day to celebrate the good things in your life and – revel in happiness and contentment. Reflect on the importance of emotional connections and what they mean to you.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_10.png"
    },
    {
        name: "Page of Cups",
        meaning: "This card represents creative ideas, good news, message and birth.",
        reading: "Today emotional exploration and creativity are on your way. Something new or unexpected may be brewing in your heart and in your interactions. Listen to your inner voice and allow your heart to take the lead when you’re making decisions – the energy here is innocent. It’s a great time to experiment with new ideas or artistic expression, and there is no need to worry about perfection. Remember to nurture your emotional well-being.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_page.png"
    },
    {
        name: "Knight of Cups",
        meaning: "This card represents new opportunities, creativeness, arrival and invitations.",
        reading: "Today, follow your heart and take bold emotional action driven by passion and love toward something that deeply resonates with you. Remain authentic and don’t be afraid to express what’s in your heart – make sure your feelings are genuine and grounded in reality. Be careful not to be swept away by fantasies whilst you’re balancing your passion with the necessary actions to make your dreams come true.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_knight.png"
    },
    {
        name: "Queen of Cups",
        meaning: "This card represents maturity, wisdom, intuition and virtue.",
        reading: "Today, emotional wisdom, compassion and intuition are your guiding lights. Embrace emotional balance and compassion in your current situation and listen to your heart when facing a decision. Pay attention to people around you and approach any relationship with empathy and care – if you’re being offered comfort and wisdom, accept it. Honour your emotions, practice self-care, and allow your intuition take the lead.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_queen.png"
    },
    {
        name: "King of Cups",
        meaning: "This card represents maturity, compassion, helpfulness and integrity.",
        reading: "Today emotional maturity, wisdom and balance are present in your life. You may need to step into a role where you need to provide emotional support, leadership or understanding – whether it’s in your personal life or at work. Find balance between emotional responses and rational solutions when facing a decision. Guide troubled individuals through turbulent waters with your kindness and emotional intelligence.",
        image: "/src/scenes/tarot/Deck/minor_arcana_cups_king.png"
    },
    {
        name: "Ace of Swords",
        meaning: "This card represents achievements, advantage, focus and victory.",
        reading: "Today clarity, truth and intellectual empowerment are guiding you, and a powerful breakthrough is on the horizon. You will have a moment of mental clarity and uncertainty is cut through by the sharpness of insight. In the near future you may receive truth that brings freedom or resolution to a situation. Honest conversations with other should be appreciated because they’ll lead to deeper understanding of one another.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_ace.png"
    },
    {
        name: "Two of Swords",
        meaning: "This card represents decisions, peace of mind, balance and conflicts.",
        reading: "Today a certain decision weighs heavily on you. Take a moment to pause and listen to your inner voice – clarity will come when you allow yourself some time to weigh the options. It’s time to balance intellect and intuition: confront a situation head-on without the fear of making the wrong choice. Reflect before moving forward and allow your emotions settle. Trust your inner wisdom and recognize, when it’s time to choose or to remain still.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_2.png"
    },
    {
        name: "Three of Swords",
        meaning: "This card represents loss, pain, suffering and new beginnings.",
        reading: "Today, you are confronted with the feelings of sadness or disappointment. You may be dealing with sorrow, whether it’s a heartache, betrayal or a lingering wound from the past. While confronting emotions may be painful, it’s important to acknowledge that the pain shall pass, making you able to move forward. This is the time to allow your tears to flow, yourself to heal and make space for personal growth.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_3.png"
    },
    {
        name: "Four of Swords",
        meaning: "This card represents healing, rest, withdrawal and delay.",
        reading: "Today, rest and recovery are calling you. Whether it’s a mental strain, emotional turmoil or physical exhaustion, you’re in need of recharging. With renewed energy you’ll be able to move forward and deal with responsibilities. This is the time to take personal space to gather thoughts before making any big decisions. Honor your need for peace and recovery and allow yourself to have time to reflect and reset for the next phase ahead.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_4.png"
    },
    {
        name: "Five of Swords",
        meaning: "This card represents conflict, defeat, low self-esteem and loss.",
        reading: "Today, a conflict or a sense of defeat may arise. It’s important to remember to pick your battles wisely – sometimes walking away is the best option rather than winning where the victory may feel unsatisfying. Reflect on your approach to any conflict and challenge yourself to assess whether your own actions are in alignment with your core principles or if there’s a better way to deal with things. Value respect, peace and integrity.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_5.png"
    },
    {
        name: "Six of Swords",
        meaning: "This card represents adventure, challenges, escape and better future.",
        reading: "Today is the day when you need to choose moving on rather than remaining stagnant. Whether it’s a literal journey or an emotional transition, you’re leaving behind difficulties in search of calmer environment. You have learnt the lessons from the past and you know how to navigate forward, ensuring yourself a better future. Seek closure and distance yourself from a painful memory. There is hope for progress and brighter days are ahead.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_6.png"
    },
    {
        name: "Seven of Swords",
        meaning: "This card represents avoiding confrontation, incompletion, failure and opponents.",
        reading: "Today, be mindful of your actions and intentions. Deception or secrecy may be at play, either from you or someone else. If you’re the one with this energy, examine your motives and ask yourself whether these intentions align with your values or what are they motivated by. Be vigilant, trust your instincts and choose honesty to avoid complications – hiding the truth come with consequences. Consider your next move carefully.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_7.png"
    },
    {
        name: "Eight of Swords",
        meaning: "This card represents frustration, obstacles, restrictions and disillusion.",
        reading: "Today, a feeling of being emotionally or mentally trapped is present. You may feel overwhelmed by the negative thoughts and a sense of helplessness, but these restrictions are in this case self-imposed: your own fears, doubts and perceptions have created a barrier that may seem insurmountable. You alone have the power and courage within to break free – look at things from a different angle, and the path will clear.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_8.png"
    },
    {
        name: "Nine of Swords",
        meaning: "This card represents paranoia, mental anguish, grief and accidents.",
        reading: "Today anxiety may keep you up at night and bother your thoughts during the day, but your worries may seem bigger than they really are. Acknowledge your fears and seek clarity to face them once and for all. Healing is only possible when confronting these uncomfortable emotions head-on – talk it through with someone, search for help, or find tools to calm your anxious thought patterns. Give yourself compassion and care.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_9.png"
    },
    {
        name: "Ten of Swords",
        meaning: "This card represents the end, failure, mortality and new hope.",
        reading: "Today, the end of a difficult chapter is near. You may have hit rock bottom and something you once held dear has come to a dramatic conclusion. While the pain may feel overwhelming, there is hope at the end of the tunnel, and a painful cycle finally ends. The agony you’ve been through served a purpose in guiding you toward personal growth and fresh start – and now it’s time to let go of the pain and face a new, better chapter.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_10.png"
    },
    {
        name: "Page of Swords",
        meaning: "This card represents changes, intelligence, vigilance and challenges.",
        reading: "Today curiosity is your guide. Be open to new ideas, eager to learn, and bring fresh perspective into the world around you. However, be cautious with how you express yourself – the enthusiasm to speak or take action may lead to impulsiveness and misunderstandings. Balance your eagerness with consideration by thinking before you speak and have patience to avoid rushing into conclusions or judgements.",
        image: "/src/scenes/tarot/Deck//minor_arcana_swords_page.png"
    },
    {
        name: "Knight of Swords",
        meaning: "This card represents expectancy, conflict, domination and loss.",
        reading: "Today is a day of action, determination and unfiltered truth. You may be in a place in your life where decisive and swift action is necessary – don’t wait or overthink but take focused steps toward your goals. Before you make your move, consider all the consequences and don’t let stubbornness take the wheel. Seize an opportunity if one arises and make sure your actions align with your values – let your sharp mind guide the way.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_knight.png"
    },
    {
        name: "Queen of Swords",
        meaning: "This card represents maturity, perception, independence and separation.",
        reading: "Today clarity and wisdom are your gifts. Approach every situation with sharp insight and speak with integrity. You have the ability to cut through confusion and see things clearly – take advantage of this talent. Use your logic to navigate challenges rather than relying on your emotions. Speak your truth whenever it’s possible, communicate your intentions with confidence and precision, and set boundaries to protect your well-being.",
        image: "/src/scenes/tarot/Deck/minor_arcana_swords_queen.png"
    },
    {
        name: "King of Swords",
        meaning: "This card represents assertiveness, leadership, maturity and authority.",
        reading: "Today, navigate situations with logic and clear thinking. Embrace rational thinking, make decisions with a sense of justice, and possibly step into a role of guidance – focusing on the bigger picture. When communicating with others, stand firm in your beliefs and trust your own ability to discern what’s right. Accept guidance from someone who wants to lend their helping hand. Remember to value and maintain a strong moral compass.",
        image: "/src/scenes/tarot/Deck//minor_arcana_swords_king.png"
    },
    {
        name: "Ace of Pentacles",
        meaning: "This card represents luck, recognition, financial success and emotional stability.",
        reading: "Today, potential and a feeling of abundance are coming your way. Whether it’s a financial prosperity, a new project or personal growth, the opportunities for success are finally presenting themselves. Make sure to solidify something long-lasting that requires patience and commitment and take a practical action toward your goals. Discipline and steady pace are foundations for success.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_ace.png"
    },
    {
        name: "Two of Pentacles",
        meaning: "This card represents balance, juggling, prudence and transfer or exchange.",
        reading: "Today balance is the key. You may be facing a situation where things feel chaotic and even unpredictable, but you need to remember to remain flexible and focused. Try to find harmony amidst change and go with the flow rather than fighting against it. You have the necessary skills to handle obstacles with grace. If things get too heavy, you need to delegate or reassess how you’re distributing your time and resources.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_2.png"
    },
    {
        name: "Three of Pentacles",
        meaning: "This card represents teamwork, success, satisfaction and mastery.",
        reading: "Today teamwork is essential, and your abilities will be recognized. Celebrate the importance of mutual respect, communication and the value of teamwork and the strength that comes from it. Don’t worry about the future because you’re on the right path – put independence aside and give some room for others to teach you. If you take time to listen, learn, and create together, you’ll get the best results and achieve the common goal.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_3.png"
    },
    {
        name: "Four of Pentacles",
        meaning: "This card represents possessiveness, security, tenacity and certainty.",
        reading: "Today, you may feel the urge to hold on tightly to what you’ve worked for. You may have gotten accustomed to feel the need to protect that you have, but it’ll lead to excessive control if you let the fear cloud your judgement. Stability is important, but the tighter the grip you have, the less room there is for new opportunities and growth. This day serves as a perfect chance to let go of the need for complete control and give yourself room to breathe.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_4.png"
    },
    {
        name: "Five of Pentacles",
        meaning: "This card represents troubles, inadequacy, worries and scarcity.",
        reading: "Today, you’ll be faced with loss, hardship, or even isolation, whether it’s financial struggle, physical ailment, or emotional turmoil. Know that help is within reach and hardship won’t last forever – just be willing to ask for support when you need it the most. Examine your thought patterns and shift your mindset toward gratitude, because even the smallest things will create a way out of the darkness. Remember to remain resilient.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_5.png"
    },
    {
        name: "Six of Pentacles",
        meaning: "This card represents distribution, favours, prosperity and solvency.",
        reading: "Today generosity, balance and gratitude are your driving forces. You will be in a position to give or receive help, and you need to remember the importance of fairness and balance in these interactions. Share your wealth, whether it’s financial, emotional, or knowledge-based, with those who need it the most. In order to achieve lasting prosperity, embrace generosity through kindness, time, and support - what goes out will return to you.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_6.png"
    },
    {
        name: "Seven of Pentacles",
        meaning: "This card represents perseverance, wealth, long-term success and occupation.",
        reading: "Today, you may benefit from taking a moment of pause and reflection. It’s time both to assess the progress you’ve made and don’t be disheartened if growth isn’t happening as fast as you hoped, or expectations aren’t met quite yet. Remind yourself that patience is a virtue, and meaningful rewards take time to come true. Trust that your efforts will bring the results you hope for, and that lack of immediate results isn’t a bad thing.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_7.png"
    },
    {
        name: "Eight of Pentacles",
        meaning: "This card represents skills, prudence, career and craftsmanship.",
        reading: "Today, you will see that focus and dedication will finally pay off. Whether it’s work related, something that you study, or a certain craft, pour your energy and time into honing your abilities – excellence can only come through repetition and consistency. Enjoy your small wins along the way and take pride in the incremental improvements. Take pride in the work you do regardless of the size of it. Your efforts will pay off in no time.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_8.png"
    },
    {
        name: "Nine of Pentacles",
        meaning: "This card represents abundance, prosperity, financial security and wealth.",
        reading: "Today, rewards of your hard work are waiting for you. Appreciate the abundance, stability, and success you’ve built for yourself – you’ve earned it. Take pride in the ability to stand on your own and thrive without relying on others. While celebrating personal achievements and enjoying success, don’t forget to remain grounded. Embrace the serenity and confidence that comes with self-sufficiency – you’ve earned it!",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_9.png"
    },
    {
        name: "Ten of Pentacles",
        meaning: "This card represents close relationships, fortune, inheritance and prosperity.",
        reading: "Today, a sense of stability and abundance are on your way. Whatever you’re building right now is for the future, you’ll leave something that’ll continue to impact those close to you – whether it’s financial security, a family bond, or a tradition. Reflect on what kind of legacy you want to leave and focus on leaving a positive impact on those close to you. Embrace contentment and fulfilment and take pride in what you’ve established so far.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_10.png"
    },
    {
        name: "Page of Pentacles",
        meaning: "This card represents motivation, expertise, attentiveness and studiousness.",
        reading: "Today opportunities for personal growth are knocking at your door. Be curious and feel the desire to learn something new – approach a new endeavour with an open mind and practical state of mind. This is a time of potential and opportunity, but it requires commitment, discipline, and willingness to take action on the things that greatly interest you. Stay grounded while building a solid foundation for the future.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_page.png"
    },
    {
        name: "Knight of Pentacles",
        meaning: "This card represents thoroughness, dependability, ambition and honour.",
        reading: "Today, being reliable, slow, steady and diligent win the race. To achieve your personal success, stay focused and patient, and avoid taking shortcuts to victory. Keep your eyes on the long-term goal, avoid distractions and trust the process. Take things one step at a time and fruits of your labour will pay off over time. In relationships, remain consistent, loyal and dependable – show up for people in your life whenever possible.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_knight.png"
    },
    {
        name: "Queen of Pentacles",
        meaning: "This card represents prosperity, wealth, abundance and financial aid.",
        reading: "Today, nurture your loved ones with kindness and care. You may find yourself in a time of decision-making, so consider practical solutions over impulsivity, whether it’s managing a career, business or relationships. Be sensible with your resources, enjoy the present, and offer a supportive presence for someone who needs a shoulder to cry on. Don’t neglect self-care and prioritize taking time to recharge whenever necessary.",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_queen.png"
    },
    {
        name: "King of Pentacles",
        meaning: "This card represents security, success, reliability and confidence.",
        reading: "Today, financial stability, authority and long-term vision are in a crucial role. The results of your hard work and rational decisions are paying off – with your methodical approach you managed to build the life you’ve always desired. Now is a perfect time to cherish your achievements. Consider leading your life with integrity – elevate others, provide support and nurture, and consider the long-term impact of your choices of future actions. ",
        image: "/src/scenes/tarot/Deck/minor_arcana_pentacles_king.png"
    }
];

// Exports the tarotMeanings array so it can be used in other parts of the application.
export default tarotMeanings;