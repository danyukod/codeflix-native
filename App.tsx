import React, {useMemo, useRef, useState} from 'react';
import {FlatList, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

type Video = {id: string; title: string; category: string; year: number; duration: string; image: string};
const videos: Video[] = [
  {id: '1', title: 'O último horizonte', category: 'Filmes', year: 2025, duration: '2h 08min', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900'},
  {id: '2', title: 'Além do tempo', category: 'Séries', year: 2024, duration: '8 episódios', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=900'},
  {id: '3', title: 'Cidades invisíveis', category: 'Documentários', year: 2023, duration: '1h 34min', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900'},
];
const colors = {background: '#0B0B0F', surface: '#17171E', primary: '#E50914', text: '#FFFFFF', muted: '#9898A5'};
function App() {
  const [query, setQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const listRef = useRef<FlatList<Video>>(null);
  const filteredVideos = useMemo(() => videos.filter(video => video.title.toLowerCase().includes(query.toLowerCase())), [query]);
  const goHome = () => {
    setQuery('');
    setSelectedVideo(videos[0]);
    listRef.current?.scrollToOffset({offset: 0, animated: true});
  };
  return <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="light-content" />
    <FlatList
      ref={listRef}
      data={filteredVideos}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={<>
        <View style={styles.topBar}><Pressable accessibilityRole="button" accessibilityLabel="Voltar para o início" onPress={goHome} onHoverIn={() => setHoveredButton('home')} onHoverOut={() => setHoveredButton(null)}><Text style={[styles.brand, hoveredButton === 'home' && {opacity: 0.7}]}>CODEFLIX</Text></Pressable><Text style={styles.profile}>●</Text></View>
        <View style={styles.hero}><Image source={{uri: selectedVideo.image}} style={styles.heroImage} /><View style={styles.heroOverlay}><Text style={styles.heroLabel}>EM DESTAQUE</Text><Text style={styles.heroTitle}>{selectedVideo.title}</Text><Text style={styles.heroMeta}>{selectedVideo.category} · {selectedVideo.year} · {selectedVideo.duration}</Text><Pressable onHoverIn={() => setHoveredButton('watch')} onHoverOut={() => setHoveredButton(null)} style={[styles.watchButton, hoveredButton === 'watch' && styles.watchButtonHover]}><Text style={styles.watchText}>▶  Assistir agora</Text></Pressable></View></View>
        <TextInput value={query} onChangeText={setQuery} placeholder="Buscar no catálogo" placeholderTextColor={colors.muted} style={styles.search} accessibilityLabel="Buscar vídeos" />
        <Text style={styles.sectionTitle}>Categorias</Text><View style={styles.categories}>{['Todos', 'Filmes', 'Séries', 'Documentários'].map(category => <Pressable key={category} onHoverIn={() => setHoveredButton(`category-${category}`)} onHoverOut={() => setHoveredButton(null)} style={[styles.category, hoveredButton === `category-${category}` && styles.categoryHover]}><Text style={styles.categoryText}>{category}</Text></Pressable>)}</View>
        <Text style={styles.sectionTitle}>Catálogo completo</Text>
      </>}
      renderItem={({item}) => <Pressable onPress={() => setSelectedVideo(item)} onHoverIn={() => setHoveredButton(`card-${item.id}`)} onHoverOut={() => setHoveredButton(null)} style={[styles.card, selectedVideo.id === item.id && styles.selectedCard, hoveredButton === `card-${item.id}` && styles.cardHover]}><Image source={{uri: item.image}} style={styles.poster} /><View style={styles.cardBody}><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.meta}>{item.category} · {item.year} · {item.duration}</Text></View></Pressable>}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum vídeo encontrado.</Text>}
      showsVerticalScrollIndicator={false}
    />
  </SafeAreaView>;
}
const styles = StyleSheet.create({safeArea: {flex: 1, backgroundColor: colors.background}, content: {padding: 20, paddingBottom: 40}, topBar: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18}, brand: {color: colors.primary, fontSize: 18, fontWeight: '900', letterSpacing: 2}, profile: {color: colors.primary, fontSize: 28}, hero: {borderRadius: 18, height: 360, marginBottom: 22, overflow: 'hidden'}, heroImage: {height: '100%', position: 'absolute', width: '100%'}, heroOverlay: {backgroundColor: 'rgba(0,0,0,0.48)', flex: 1, justifyContent: 'flex-end', padding: 20}, heroLabel: {color: '#FFB3B7', fontSize: 12, fontWeight: '800', letterSpacing: 1}, heroTitle: {color: colors.text, fontSize: 30, fontWeight: '800', marginTop: 6}, heroMeta: {color: '#E4E4E8', fontSize: 13, marginTop: 8}, watchButton: {alignSelf: 'flex-start', backgroundColor: colors.text, borderRadius: 8, marginTop: 18, paddingHorizontal: 16, paddingVertical: 11}, watchButtonHover: {backgroundColor: colors.primary, transform: [{scale: 1.03}]}, watchText: {color: colors.background, fontSize: 14, fontWeight: '800'}, search: {backgroundColor: colors.surface, borderRadius: 12, color: colors.text, fontSize: 16, paddingHorizontal: 16, paddingVertical: 14}, sectionTitle: {color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: 14, marginTop: 28}, categories: {flexDirection: 'row', gap: 8}, category: {backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9}, categoryHover: {backgroundColor: colors.primary, transform: [{translateY: -2}]}, categoryText: {color: colors.muted, fontSize: 13, fontWeight: '600'}, card: {backgroundColor: colors.surface, borderRadius: 14, flexDirection: 'row', marginBottom: 14, overflow: 'hidden'}, cardHover: {backgroundColor: '#23232D', transform: [{translateY: -3}]}, selectedCard: {borderColor: colors.primary, borderWidth: 1}, poster: {height: 112, width: 110}, cardBody: {justifyContent: 'center', padding: 14}, cardTitle: {color: colors.text, fontSize: 17, fontWeight: '700'}, meta: {color: colors.muted, fontSize: 13, marginTop: 8}, empty: {color: colors.muted, fontSize: 16, paddingVertical: 24}});
export default App;
