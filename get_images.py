import requests
from bs4 import BeautifulSoup
import os
import urllib.parse

def download_wiki_images(url, download_path='./pd2_items_images'):
    # Create download directory if it doesn't exist
    os.makedirs(download_path, exist_ok=True)
    
    # Add a user agent to mimic a browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        # Send a GET request with headers
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all image tags
        img_tags = soup.find_all('img')
        
        # Counter for successful downloads
        download_count = 0
        
        # Download images
        for img in img_tags:
            # Get the image source
            img_src = img.get('src')
            
            # Skip if no source
            if not img_src:
                continue
            
            # Construct full URL for relative paths
            if img_src.startswith('//'):
                img_src = 'https:' + img_src
            elif img_src.startswith('/'):
                img_src = urllib.parse.urljoin('https://wiki.projectdiablo2.com', img_src)
            
            # Check if it's a PNG or other image
            if img_src.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                try:
                    # Download the image
                    img_response = requests.get(img_src, headers=headers)
                    img_response.raise_for_status()
                    
                    # Generate filename
                    filename = os.path.basename(img_src)
                    filepath = os.path.join(download_path, filename)
                    
                    # Save the image
                    with open(filepath, 'wb') as file:
                        file.write(img_response.content)
                    
                    print(f"Downloaded: {filename}")
                    download_count += 1
                
                except Exception as e:
                    print(f"Error downloading {img_src}: {e}")
        
        print(f"Total images downloaded: {download_count}")
    
    except requests.RequestException as e:
        print(f"Error accessing the website: {e}")

# URL of the Project Diablo 2 wiki page
url = 'https://wiki.projectdiablo2.com/wiki/All_Items'
download_wiki_images(url)