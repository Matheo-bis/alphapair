package fr.uha.ensisa.alphapair.security;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Properties;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("singleton")
public class PropertyManager {
	
	private Properties props;
	
	public static final String ANSI_RESET = "\u001B[0m";
	public static final String ANSI_YELLOW = "\u001B[33m";
	
	public PropertyManager() {
		System.out.println(ANSI_YELLOW + "New PropertyManager instance created." + ANSI_RESET);
		try {
			props = new Properties();
			String propsFileName = "application.properties";
			
			InputStream is = getClass().getClassLoader().getResourceAsStream(propsFileName);
			
			if (is != null) {
				props.load(is);
			} else {
				throw new FileNotFoundException("property file '" + propsFileName + "' not found in the classpath");
			}
			
			is.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String getProperty(String key) {
		return props.getProperty(key);
	}
	
}
